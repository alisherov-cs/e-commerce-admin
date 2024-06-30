import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { provideAuth } from '@angular/fire/auth';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

const firebaseConfig = {
  apiKey: 'AIzaSyBhlwg7iTAjM0gBP8LzM8KU7IxhBnZEdMY',
  authDomain: 'online-tech-store-8e5f6.firebaseapp.com',
  projectId: 'online-tech-store-8e5f6',
  storageBucket: 'online-tech-store-8e5f6.appspot.com',
  messagingSenderId: '256103377960',
  appId: '1:256103377960:web:d7eeccd1cc0d603fbdd91d',
  measurementId: 'G-E0EB3GB6KE',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      },
    },
  ],
};
