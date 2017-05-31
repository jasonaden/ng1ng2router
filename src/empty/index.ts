// This module is purely written in AngularJS.
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EmptyComponent} from './empty_cmp';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '**', component: EmptyComponent }])
  ],
  declarations: [
    EmptyComponent
  ]
})
export class EmptyNgModule {}