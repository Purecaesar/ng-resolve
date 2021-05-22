import { ActivatedRoute } from "@angular/router";

export function getRouteWithData(route: ActivatedRoute, fieldName: string, propagation: boolean): ActivatedRoute {
  do {
    if (fieldName in route.snapshot.data) return route;

    route = route.parent;
  } while (route && propagation);

  if (propagation) throw new Error(`Field ${fieldName} didn't find in route tree`);

  throw new Error (`Field ${fieldName} didn't find in current route`);
}