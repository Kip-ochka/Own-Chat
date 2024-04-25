import { Block } from "./Block.ts";

export function renderDom<T extends object>(
  rootSelector: string,
  component: Block<T>
) {
  const root = document.getElementById(rootSelector);
  if (!root) {
    throw new Error("Root not found!");
  }

  component.dispatchComponentDidMount();
  root.innerHTML = "";
  root.append(component.element);
}
