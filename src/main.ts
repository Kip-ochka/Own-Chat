import { renderDom } from "./utils/renderDom.ts";
import * as Pages from "./pages";

const navigate = (page: string) => {
  // @ts-ignore
  renderDom("root", Pages[page]());
};

document.addEventListener("click", (e) => {
  const element = e.target as HTMLElement;
  if (!element) return;

  const page = element.getAttribute("page");
  if (!page) return;
  navigate(page);
  e.preventDefault();
  e.stopImmediatePropagation();
});
