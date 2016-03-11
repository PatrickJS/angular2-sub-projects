
import 'angular2-universal-preview/polyfills';

import gulp = require('gulp');

import {REQUEST_URL, NODE_LOCATION_PROVIDERS} from 'angular2-universal-preview';
import {provide, enableProdMode, PLATFORM_DIRECTIVES} from 'angular2/core';
import {APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from 'angular2/router';
import {prerender} from 'angular2-gulp-prerender';

import {App} from './src/app/app';
import {ServerOnlyApp} from './src/server-only-app/server-only-app';

enableProdMode();

gulp.task('prerender', () => {

  return gulp.src('./src/index.html')
    .pipe(prerender({
      directives: [App, ServerOnlyApp],
      providers: [
        provide(APP_BASE_HREF, {useValue: '/'}),
        provide(REQUEST_URL, {useValue: '/'}),
        ROUTER_PROVIDERS,
        provide(PLATFORM_DIRECTIVES, {useValue: ROUTER_DIRECTIVES, multi: true}),
        NODE_LOCATION_PROVIDERS,
      ],
      preboot: false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch:prerender', () => {
  gulp.watch(['./src/index.html', './src/app/**'], ['prerender']);
});

gulp.task('default', ['prerender'], () => {
  console.log('welcome');
});
