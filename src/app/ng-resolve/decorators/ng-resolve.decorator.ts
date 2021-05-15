import { ChangeDetectorRef, ComponentRef } from '@angular/core';
import { OutletContext, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { pluck, switchMap, takeUntil } from 'rxjs/operators';
import { getCurrentOutlet } from '../functions/get-current-outlet';
import { StaticInjectorService } from '../services/static-injector.service';

export function NgResolve(name?: string) {
  return function(target: any, key: string) {
    console.log('comp init');
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
          cdr = compRef.injector.get(ChangeDetectorRef);

          compRef.onDestroy(() => {
            inited = false;
            destroyer.next();
            console.log('destroy');
          });

          return currentActivatedOutlet.route.data.pipe(
            pluck(name || key),
            takeUntil(destroyer)
          );
        })
      )
      .subscribe({
        next: data => {
          routerData = data;
          cdr.markForCheck();
        }
      });

    Object.defineProperty(target, key, {
      get() {
        if (!inited) {
          inited = true;
          triger.next();
        }

        return routerData;
      },
      set(value: any) {
        routerData = value;
      }
    });
  };
}
