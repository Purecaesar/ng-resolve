import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NgResolve } from '../ng-resolve/decorators/ng-resolve.decorator';

@Component({
  selector: 'app-lazy',
  template: `
    <div>Lazy module</div>
    <a routerLink="./nested">nested-route</a>
    <br />
    <a routerLink="../2/nested">nested-route next</a>
    <br />
    <a routerLink="../1/nested">nested-route prev</a>
    <br />
    <br />
    <a routerLink="../2">next</a>
    <br />
    <a routerLink="../1">prev</a>
    <br />
    <a routerLink="../../">root</a>
    <br />
    <button (click)="changeValue()">change value</button>
    <div>{{ data | json }}</div>
    <app-nested></app-nested>
    <br />
    <br />
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyComponent {
  @NgResolve()
  public set data(number: number[]) {
    this._data = number;
  }
  public get data() {
    return this._data;
  }

  private _data: number[];

  public changeValue() {
    this.data = [5];
  }
}
