import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyResolverService } from './lazy-resolver.service';
import { LazyComponent } from './lazy.component';
import { NsetedRouteDataResolver } from './nested-route/nested-route-data-resolver.service';
import { NestedRouteComponent } from './nested-route/nested-route.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: ':id',
        component: LazyComponent,
        resolve: {
          data: LazyResolverService
        },
        children: [
          {
            path: 'nested',
            component: NestedRouteComponent,
            resolve: {
              nestedRouteData: NsetedRouteDataResolver
            }
          }
        ]
      },
      {
        path: '',
        redirectTo: '1'
      }
    ])
  ],
  providers: [LazyResolverService, NsetedRouteDataResolver],
  exports: [RouterModule]
})
export class LazyRouterModule {}
