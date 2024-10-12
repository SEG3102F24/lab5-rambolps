import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {environment} from "../environments/environment.development";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({"projectId":"lab5-8cfad","appId":"1:370594962669:web:21dc7abeecd10f3251c0e4","storageBucket":"lab5-8cfad.appspot.com","apiKey":"AIzaSyAL5ksyAgRgsZdvbIFMBAamOQew_WM2djM","authDomain":"lab5-8cfad.firebaseapp.com","messagingSenderId":"370594962669","measurementId":"G-GKE3SRVJ3D"})), 
    provideFirestore(() => getFirestore())]
};
