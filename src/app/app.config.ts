// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]
// };
// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideClientHydration } from '@angular/platform-browser';
// import { provideAnimations } from '@angular/platform-browser/animations';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideAnimations(),  
//     provideRouter(routes),
//     provideClientHydration()
//   ]
// };

// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideClientHydration()
  ]
};