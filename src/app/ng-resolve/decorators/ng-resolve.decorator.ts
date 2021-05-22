import { ChangeDetectorRef, ComponentRef } from '@angular/core';
import { OutletContext, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { pluck, switchMap, takeUntil } from 'rxjs/operators';
import { getCurrentOutlet } from '../functions/get-current-outlet';
import { getRouteWithData } from '../functions/get-route-with-data';
import { StaticInjectorService } from '../services/static-injector.service';

export function NgResolve(name?: string, propagation = true) {
  return function(
    target: any,
    key: string,
    originalDescriptor?: TypedPropertyDescriptor<any>
  ): any {
    const router = StaticInjectorService.Injector.get(Router);
    const triger = new Subject();
    const destroyer = new Subject();
    const rootContextMap = (router as any).rootContexts.contexts as Map<
      string,
      OutletContext
    >;

    let routerData: any;
    let cdr: ChangeDetectorRef;
    let inited = false;

    triger
      .pipe(
        switchMap(() => {
          const currentActivatedOutlet = getCurrentOutlet(
            rootContextMap,
            target.constructor
          );

          if (!currentActivatedOutlet)
            throw new Error('Component is not in router tree');

          const outlet: any = currentActivatedOutlet.outlet;
          const compRef = outlet.activated as ComponentRef<any>;
          const routeWithData = getRouteWithData(
            currentActivatedOutlet.route,
            name || key,
            propagation
          );

          cdr = compRef.injector.get(ChangeDetectorRef);

          compRef.onDestroy(() => {
            inited = false;
            destroyer.next();
            console.log('destroy');
          });

          return routeWithData.data.pipe(
            pluck(name || key),
            takeUntil(destroyer)
          );
        })
      )
      .subscribe({
        next: data => {
          target[key] = data;
          cdr.markForCheck();
        }
      });

    return {
      get() {
        if (!inited) {
          inited = true;
          triger.next();
        }

        return originalDescriptor
          ? originalDescriptor.get.call(target)
          : routerData;
      },
      set(value: any) {
        routerData = value;
        if (originalDescriptor) originalDescriptor.set.call(target, routerData);
      }
    };
  };
}
