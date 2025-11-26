export type Route = {
  href: string;
  label: string;
};

export type RouteWithDropdown = Route & {
  dropdown?: Route[];
};
