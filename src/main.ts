import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
// import { HTTP_PROVIDERS } from '@angular/http'
import { LocustModule } from './app/locust/module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(LocustModule);
