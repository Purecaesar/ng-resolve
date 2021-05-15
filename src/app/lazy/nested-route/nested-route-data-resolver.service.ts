import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NsetedRouteDataResolver implements Resolve<any> {
  public resolve(route: ActivatedRouteSnapshot) {
    const id = route.parent.paramMap.get('id');

    return timer(1000).pipe(map(() => `Nested Data is here! ${id} - lazy id`));
  }
}
