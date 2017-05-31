// This module was fully migrated to Angular
import {NgModule, Injectable, Component} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {RouterModule, Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SettingsCmp} from './settings_cmp';
import {PageSizeCmp} from './page_size_cmp';
import * as ng from 'angular';

export class TabService {
  constructor(private $q: ng.IQService) {}

  getTabs(): any {
    console.log('getTabs');
    // Works fine.
    return this.$q.when(['resolved value']).then((v) => {
      console.log('resolved');
      return v;
    }).then(v => v);
  }
}

export const TabModule = ng.module('TabModule', []);
TabModule.service('panTabService', TabService);

export function getTabService(i: ng.auto.IInjectorService) {
  return i.get('panTabService');
}

@Injectable()
export class TabResolver implements Resolve<string[]> {
  constructor(private tabService: TabService) {}
  resolve(): Promise<string[]> {
    return this.tabService.getTabs();
  }
}

@Component({
  selector: 'tabs',
  template: `<h3>tabs</h3>
  [<router-outlet></router-outlet>]
  <br/>
  <a routerLink="tab1">tab1</a>
  <br/>
  <a routerLink="tab2">tab2</a>
  `,
})
export class TabsCmp {
  constructor() {
    console.log('creating the tab cmp');
  }
}

@Component({
  selector: 'tab-1',
  template: `<p>TAB #1</p>`,
})
export class Tab1Cmp {}

@Component({
  selector: 'tab-2',
  template: `<p>TAB #2</p>`,
})
export class Tab2Cmp {}


@Injectable()
export class PageSizeResolver implements Resolve<string|null> {
  constructor(private router: Router, private location: Location) {}
  resolve(route: ActivatedRouteSnapshot) {
    this.router.navigateByUrl('/messages/inbox', {skipLocationChange: true});
    return Promise.resolve(null);
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'settings', children: [
        { path: '', component: SettingsCmp  },
        { path: 'pagesize', component: PageSizeCmp, resolve: {'pageSize': PageSizeResolver}}
      ] },

      {path: 'tabs', component: TabsCmp, children: [
        { path: 'tab1', component: Tab1Cmp},
        { path: 'tab2', component: Tab2Cmp, resolve: {'tabs': TabResolver}},
      ]}



    ])
  ],
  declarations: [
    SettingsCmp,
    PageSizeCmp,
    TabsCmp,
    Tab1Cmp,
    Tab2Cmp
  ],
   providers: [
     TabResolver,
     PageSizeResolver,
     {provide: TabService, useFactory: getTabService, deps: ['$injector']},
   ]

})
export class SettingsNgModule {
}