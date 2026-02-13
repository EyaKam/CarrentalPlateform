import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { CarListComponent } from './pages/car-list/car-list';
import { CarDetailsComponent } from './pages/car-details/car-details';
import { BookingComponent } from './pages/booking/booking';

export const routes: Routes = [
  { path: '', component: HomeComponent },                    // Page d'accueil par défaut
  { path: 'login', component: LoginComponent },              // Lien vers /login
  { path: 'register', component: RegisterComponent },        // Lien vers /register
  { path: 'cars', component: CarListComponent },             // Lien vers /cars
  { path: 'car-details/:id', component: CarDetailsComponent }, // Lien vers /car-details/{id}
  { path: 'booking/:id', component: BookingComponent },      // Lien vers /booking/{id}
  { path: '**', redirectTo: '' }                             // Si l'URL n'existe pas -> retour accueil
];