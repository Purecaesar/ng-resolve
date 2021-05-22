import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgResolve } from '../../ng-resolve/decorators/ng-resolve.decorator';

@Component({
  selector: 'app-nested-route',
  template: `
    I'm nested-route! And NgResolve works here! :)
    <br />
    {{ nestedData }}
    <br />
    It's my parant's data!
    <br />
    {{ parentData | json }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedRouteComponent {
  @NgResolve('nestedRouteData')
  public nestedData: string;

  @NgResolve('data')
  public parentData: string[];
}
