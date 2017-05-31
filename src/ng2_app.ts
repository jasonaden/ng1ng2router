/**
 * This file defines the root module of the Angular 2 of the application.
 */

// import Angular
import {NgModule, Component} from '@angular/core';
import {RouterModule, UrlHandlingStrategy} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';

// import app modules
import {MessagesNgModule} from './messages';
import {MenuNgModule} from './menu';
import {SettingsNgModule} from './settings';
import {EmptyNgModule} from './empty';

// This URL handling strategy is custom and application-specific.
// Using it we can tell the Angular router to handle only URL starting with settings.
export class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) {
    // Only `/settings/*` routes are handled by Angular, other are still handled by AngularJS
    return url.toString().startsWith("/settings") || url.toString().startsWith("/tabs") || url.toString() === '/';
  }

  extract(url) { return url; }
  merge(url, whole) { return url; }
}

@Component({
  selector: 'root-cmp',
  template: `
    <router-outlet></router-outlet>
    <div class="ng-view"></div>
  `,
})
export class RootCmp {}

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,

    // import all modules
    MenuNgModule,
    MessagesNgModule,
    SettingsNgModule,
    // EmptyNgModule,

    // We don't need to provide any routes.
    // The router will collect all routes from all the registered modules.
    RouterModule.forRoot([], {enableTracing: true})
  ],
  providers: [
    { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy }
  ],

  bootstrap: [RootCmp],
  declarations: [RootCmp]
})
export class Ng2AppModule {
  constructor(public upgrade: UpgradeModule){}
}