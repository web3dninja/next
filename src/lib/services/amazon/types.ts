export interface AmazonProductItem {
  ASIN: string;
  DetailPageURL: string;
  ParentASIN?: string;
  Images?: {
    Primary?: {
      Small?: {
        URL: string;
        Height: number;
        Width: number;
      };
      Medium?: {
        URL: string;
        Height: number;
        Width: number;
      };
      Large?: {
        URL: string;
        Height: number;
        Width: number;
      };
    };
  };
  ItemInfo?: {
    ByLineInfo?: {
      Brand?: {
        DisplayValue: string;
        Label?: string;
        Locale?: string;
      };
    };
    ContentInfo?: {
      Edition?: {
        DisplayValue: string;
        Label?: string;
        Locale?: string;
      };
    };
    ContentRating?: {
      AudienceRating?: {
        DisplayValue: string;
        Label?: string;
        Locale?: string;
      };
    };
    ExternalIds?: {
      EANs?: {
        DisplayValues: string[];
        Label?: string;
        Locale?: string;
      };
      UPCs?: {
        DisplayValues: string[];
        Label?: string;
        Locale?: string;
      };
    };
    Features?: {
      DisplayValues: string[];
      Label?: string;
      Locale?: string;
    };
    ManufactureInfo?: {
      ItemPartNumber?: {
        DisplayValue: string;
        Label?: string;
        Locale?: string;
      };
    };
    ProductInfo?: {
      Color?: {
        DisplayValue: string;
        Label?: string;
        Locale?: string;
      };
      IsAdultProduct?: {
        DisplayValue: boolean;
        Label?: string;
        Locale?: string;
      };
      ItemDimensions?: {
        Height?: {
          DisplayValue: number;
          Unit: string;
          Label?: string;
          Locale?: string;
        };
        Length?: {
          DisplayValue: number;
          Unit: string;
          Label?: string;
          Locale?: string;
        };
        Weight?: {
          DisplayValue: number;
          Unit: string;
          Label?: string;
          Locale?: string;
        };
        Width?: {
          DisplayValue: number;
          Unit: string;
          Label?: string;
          Locale?: string;
        };
      };
      Size?: {
        DisplayValue: string;
        Label?: string;
        Locale?: string;
      };
      UnitCount?: {
        DisplayValue: number;
        Label?: string;
        Locale?: string;
      };
    };
    TechnicalInfo?: {
      Formats?: {
        DisplayValues: string[];
        Label?: string;
        Locale?: string;
      };
    };
    Title?: {
      DisplayValue: string;
      Label?: string;
      Locale?: string;
    };
  };
  Offers?: {
    Listings?: Array<{
      Availability?: {
        MaxOrderQuantity?: number;
        Message: string;
        MinOrderQuantity?: number;
        Type: string;
      };
      Condition?: {
        ConditionNote?: string;
        SubCondition?: string;
        Value: string;
        DisplayValue?: string;
        Label?: string;
        Locale?: string;
      };
      DeliveryInfo?: {
        IsAmazonFulfilled?: boolean;
        IsFreeShippingEligible?: boolean;
        IsPrimeEligible?: boolean;
      };
      LoyaltyPoints?: {
        Points?: number;
      };
      MerchantInfo?: {
        Id: string;
        Name: string;
      };
      Price?: {
        Amount: number;
        Currency: string;
        DisplayAmount: string;
      };
      ProgramEligibility?: {
        IsPrimeExclusive?: boolean;
        IsPrimePantry?: boolean;
      };
      Promotions?: Array<{
        Amount: number;
        Currency: string;
        DisplayAmount: string;
        Type: string;
      }>;
      SavingBasis?: {
        Amount: number;
        Currency: string;
        DisplayAmount: string;
      };
    }>;
    Summaries?: Array<{
      Condition?: {
        Value: string;
        DisplayValue?: string;
        Label?: string;
        Locale?: string;
      };
      HighestPrice?: {
        Amount: number;
        Currency: string;
        DisplayAmount: string;
      };
      LowestPrice?: {
        Amount: number;
        Currency: string;
        DisplayAmount: string;
      };
      OfferCount?: number;
    }>;
  };
  OffersV2?: {
    Listings?: Array<{
      Availability?: {
        MaxOrderQuantity?: number;
        Message: string;
        MinOrderQuantity?: number;
        Type: string;
      };
      Condition?: {
        DisplayValue?: string;
        Label?: string;
        Locale?: string;
        Value?: string;
      };
      Price?: {
        Money?: {
          Amount: number;
          Currency: string;
          DisplayAmount: string;
        };
      };
      MerchantInfo?: {
        Id?: string;
        Name?: string;
      };
    }>;
    Summaries?: Array<{
      Condition?: {
        Value: string;
        DisplayValue?: string;
        Label?: string;
        Locale?: string;
      };
      HighestPrice?: {
        Amount: number;
        Currency: string;
        DisplayAmount: string;
      };
      LowestPrice?: {
        Amount: number;
        Currency: string;
        DisplayAmount: string;
      };
      OfferCount?: number;
    }>;
  };
}

export interface AmazonGetItemsResponse {
  Errors?: Array<{
    __type: string;
    Code: string;
    Message: string;
  }>;
  ItemResults?: {
    Items: AmazonProductItem[];
  };
  ItemsResult?: {
    Items: AmazonProductItem[];
  };
}

export interface AmazonProductData {
  asin: string;
  url: string;
  price: number;
  description: string;
  image: string;
  title: string;
  brand?: string;
}
