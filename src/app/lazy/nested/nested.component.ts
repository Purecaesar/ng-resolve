import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgResolve } from '../../ng-resolve/decorators/ng-resolve.decorator';

@Component({
  selector: 'app-nested',
  template: `
    <div>I'm nested! And NgResolve doesn't work here :(</div>
    <br />
    {{ nestedData }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedComponent {
  @NgResolve('data')
  public nestedData: number[];
}
