import { OutletContext } from "@angular/router";

export function getCurrentOutlet(contextsMap: Map<string, OutletContext>, component: any) {
  const contextsArray = Array.from(contextsMap.values());

  while (contextsArray.length) {
    const outlet = contextsArray.shift();

    if (outlet.route?.component === component) {
      return outlet;
    }

    const childrenContexts = (outlet.children as any)?.contexts as Map<string, OutletContext>;

    contextsArray.push(...Array.from(childrenContexts.values()));
  }
}