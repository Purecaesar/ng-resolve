import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RouterModule } from '@angular/router';
import { NgResolveModule } from './ng-resolve/ng-resolve.module';

@NgModule({
  imports: [
    NgResolveModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'lazy',
        loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
      }
      // {
      //   path: '**',
      //   redirectTo: 'lazy'
      // }
    ])
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
