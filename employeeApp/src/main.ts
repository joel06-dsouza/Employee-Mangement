import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
