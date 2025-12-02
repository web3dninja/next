import crypto from 'crypto';
import type { AmazonProductData, AmazonGetItemsResponse, AmazonProductItem } from './types';

interface AmazonAPIConfig {
  accessKey: string;
  secretKey: string;
  partnerTag: string;
  marketplace: string;
  region: string;
}

function getAmazonConfig(): AmazonAPIConfig | null {
  const accessKey = process.env.AMAZON_ACCESS_KEY;
  const secretKey = process.env.AMAZON_SECRET_KEY;
  const partnerTag = process.env.AMAZON_PARTNER_TAG;
  const marketplace = process.env.AMAZON_MARKETPLACE;
  const region = process.env.AMAZON_REGION;

  if (!accessKey || !secretKey || !partnerTag || !marketplace || !region) {
    return null;
  }

  return { accessKey, secretKey, partnerTag, marketplace, region };
}

function createSignature(
  method: string,
  uri: string,
  queryString: string,
  payload: string,
  secretKey: string,
  region: string,
  host: string,
  requestHeaders: Record<string, string>,
): string {
  const algorithm = 'AWS4-HMAC-SHA256';
  const service = 'ProductAdvertisingAPI';
  const amzDate = requestHeaders['x-amz-date'];
  const dateStamp = amzDate.substring(0, 8);
  const sortedHeaderKeys = Object.keys(requestHeaders).sort();
  const canonicalHeaders =
    sortedHeaderKeys.map(key => `${key.toLowerCase()}:${requestHeaders[key].trim()}`).join('\n') +
    '\n';
  const signedHeaders = sortedHeaderKeys.map(key => key.toLowerCase()).join(';');

  const canonicalUri = uri;
  const canonicalQueryString = queryString;
  const payloadHash = crypto.createHash('sha256').update(payload).digest('hex');
  const canonicalRequest = `${method}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;

  const kDate = crypto.createHmac('sha256', `AWS4${secretKey}`).update(dateStamp).digest();
  const kRegion = crypto
    .createHmac('sha256', kDate as unknown as crypto.BinaryLike)
    .update(region)
    .digest();
  const kService = crypto
    .createHmac('sha256', kRegion as unknown as crypto.BinaryLike)
    .update(service)
    .digest();
  const kSigning = crypto
    .createHmac('sha256', kService as unknown as crypto.BinaryLike)
    .update('aws4_request')
    .digest();
  const signature = crypto
    .createHmac('sha256', kSigning as unknown as crypto.BinaryLike)
    .update(stringToSign)
    .digest('hex');

  return signature;
}

async function fetchAmazonProduct(asin: string): Promise<AmazonProductItem | null> {
  try {
    const config = getAmazonConfig();
    if (!config) {
      return null;
    }
    const host =
      config.region === 'us-east-1'
        ? 'webservices.amazon.com'
        : `webservices.amazon.${config.region}.amazonaws.com`;
    const endpoint = `https://${host}/paapi5/getitems`;

    const payload = {
      PartnerTag: config.partnerTag,
      PartnerType: 'Associates',
      Marketplace: config.marketplace,
      ItemIds: [asin],
      Condition: 'New',
      Resources: [
        'Images.Primary.Large',
        'Images.Primary.Medium',
        'ItemInfo.Title',
        'ItemInfo.ByLineInfo',
        'ItemInfo.Features',
        'OffersV2.Listings.Availability',
        'OffersV2.Listings.Condition',
        'OffersV2.Listings.Price',
        'OffersV2.Listings.MerchantInfo',
      ],
    };

    const payloadString = JSON.stringify(payload);
    const uri = '/paapi5/getitems';
    const queryString = '';
    const method = 'POST';
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:\-]|\.\d{3}/g, '');
    const dateStamp = amzDate.substring(0, 8);

    const requestHeaders = {
      'content-encoding': 'amz-1.0',
      'content-type': 'application/json; charset=utf-8',
      host: host,
      'x-amz-target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems',
      'x-amz-date': amzDate,
    };

    const signature = createSignature(
      method,
      uri,
      queryString,
      payloadString,
      config.secretKey,
      config.region,
      host,
      requestHeaders,
    );

    const authorization = `AWS4-HMAC-SHA256 Credential=${config.accessKey}/${dateStamp}/${config.region}/ProductAdvertisingAPI/aws4_request, SignedHeaders=content-encoding;content-type;host;x-amz-date;x-amz-target, Signature=${signature}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        ...requestHeaders,
        Authorization: authorization,
      },
      body: payloadString,
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error(
        `Amazon API error for ASIN ${asin}: ${response.status} ${response.statusText}`,
        responseText,
      );
      return null;
    }

    let data: AmazonGetItemsResponse;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error(`Failed to parse Amazon API response for ASIN ${asin}:`, parseError);
      return null;
    }

    if (data.Errors && data.Errors.length > 0) {
      console.error(`Amazon API errors for ASIN ${asin}:`, data.Errors);
      return null;
    }

    const items = data.ItemsResult?.Items || data.ItemResults?.Items;
    if (items && items.length > 0) {
      return items[0];
    }

    return null;
  } catch (error) {
    return null;
  }
}

export function extractAmazonProductData(item: AmazonProductItem): AmazonProductData | null {
  if (!item) return null;

  const priceFromV2Listings = item.OffersV2?.Listings?.[0]?.Price?.Money?.Amount;
  const priceFromListings = item.Offers?.Listings?.[0]?.Price?.Amount;
  const priceFromV2Summaries = item.OffersV2?.Summaries?.[0]?.HighestPrice?.Amount;
  const priceFromSummaries = item.Offers?.Summaries?.[0]?.HighestPrice?.Amount;
  const price =
    priceFromV2Listings || priceFromListings || priceFromV2Summaries || priceFromSummaries || 0;

  const image =
    item.Images?.Primary?.Large?.URL ||
    item.Images?.Primary?.Medium?.URL ||
    item.Images?.Primary?.Small?.URL ||
    '';

  const title = item.ItemInfo?.Title?.DisplayValue || '';
  const description = item.ItemInfo?.Features?.DisplayValues?.join('. ') || '';
  const brand = item.ItemInfo?.ByLineInfo?.Brand?.DisplayValue;
  const url = item.DetailPageURL || '';

  return {
    asin: item.ASIN,
    url,
    price, // Amount is already in dollars, not cents
    description,
    image,
    title,
    brand,
  };
}

export async function getAmazonProductData(asin: string): Promise<AmazonProductData | null> {
  const item = await fetchAmazonProduct(asin);

  if (!item) {
    return null;
  }

  const extractedData = extractAmazonProductData(item);
  return extractedData;
}

export async function getAmazonProductsData(
  asins: string[],
): Promise<Map<string, AmazonProductData>> {
  const results = new Map<string, AmazonProductData>();

  const batchSize = 10;
  for (let i = 0; i < asins.length; i += batchSize) {
    const batch = asins.slice(i, i + batchSize);
    const promises = batch.map(async asin => {
      const data = await getAmazonProductData(asin);
      if (data) {
        results.set(asin, data);
      }
    });

    await Promise.all(promises);

    if (i + batchSize < asins.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}
