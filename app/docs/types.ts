import { ReactNode } from "react";

export interface DocPage {
  title: string;
  content: ReactNode;
}

export type DocsContent = Record<string, DocPage>;
