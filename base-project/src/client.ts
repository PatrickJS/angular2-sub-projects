import {prebootComplete} from 'angular2-universal-preview';

import {provide, PLATFORM_DIRECTIVES} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from 'angular2/router';

import {App} from './app/app';

export function main() {
  return bootstrap(App, [
    ...ROUTER_PROVIDERS,
    provide(PLATFORM_DIRECTIVES, {useValue: ROUTER_DIRECTIVES, multi: true})
  ])
  .then(prebootComplete);
}

main();
