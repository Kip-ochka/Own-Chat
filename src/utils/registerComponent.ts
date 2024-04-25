import Handlebars, { HelperOptions } from "handlebars";
import { Block } from "./Block.ts";

export function registerComponent<T extends object>(
  componentName: string,
  componentFn: (props: T) => Block<T>
) {
  if (componentName in Handlebars.helpers) {
    throw `The ${componentName} component is already registered!`;
  }
  Handlebars.registerHelper(componentName, ({ hash, data }: HelperOptions) => {
    if (!data.root.children) {
      data.root.children = {};
    }
    const { children } = data.root;
    const component = componentFn(hash);

    children[component.__id] = component;

    return `<div data-id="${component.__id}"></div>`;
  });
}
