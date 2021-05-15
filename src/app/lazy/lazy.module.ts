import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LazyRouterModule } from './lazy-router.module';
import { LazyComponent } from './lazy.component';
import { NestedRouteComponent } from './nested-route/nested-route.component';
import { NestedComponent } from './nested/nested.component';

@NgModule({
  imports: [CommonModule, LazyRouterModule],
  declarations: [LazyComponent, NestedComponent, NestedRouteComponent]
})
export class LazyModule {}
