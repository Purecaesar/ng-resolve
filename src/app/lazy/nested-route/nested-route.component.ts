import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgResolve } from '../../ng-resolve/decorators/ng-resolve.decorator';

@Component({
  selector: 'app-nested-route',
  template: `
    I'm nested-route! And NgResolve works here! :)
    <br />
    {{ nestedData }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedRouteComponent {
  @NgResolve('nestedRouteData')
  public nestedData: string;
}
