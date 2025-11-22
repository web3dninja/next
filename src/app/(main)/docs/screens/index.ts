import { DocsContent } from "../types";
import { homePage } from "./home";
import { introPage } from "./intro";
import { guidesPage, routingPage, dataFetchingPage, stylingPage } from "./guides";
import { apiPage } from "./api";
import { examplesPage } from "./examples";

export const docsContent: DocsContent = {
  "": homePage,
  "intro": introPage,
  "guides": guidesPage,
  "guides/routing": routingPage,
  "guides/data-fetching": dataFetchingPage,
  "guides/styling": stylingPage,
  "api": apiPage,
  "examples": examplesPage,
};

