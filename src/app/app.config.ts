import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({ "projectId": "join-angular-d79e8", "appId": "1:898243239657:web:781934f1220f85f4349a78", "storageBucket": "join-angular-d79e8.appspot.com", "apiKey": "AIzaSyAMaqgIOk3PVW2reJugIKLcdsDyiRGo6p0", "authDomain": "join-angular-d79e8.firebaseapp.com", "messagingSenderId": "898243239657" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ]
};
