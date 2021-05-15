import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LazyResolverService implements Resolve<any> {
  public resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');

    return timer(1000).pipe(map(() => [+id]));
  }
}
