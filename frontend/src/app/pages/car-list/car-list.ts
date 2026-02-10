import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important pour la boucle *ngFor

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './car-list.html',
  styleUrl: './car-list.css'
})
export class CarListComponent {
  // On crée une fausse liste de voitures pour tester le design
  cars = [
    {
      brand: 'Toyota',
      model: 'Corolla',
      price: 50,
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop',
      available: true
    },
    {
      brand: 'Tesla',
      model: 'Model 3',
      price: 120,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop',
      available: true
    },
    {
      brand: 'BMW',
      model: 'X5',
      price: 150,
      image: 'https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=2080&auto=format&fit=crop',
      available: false
    }
  ];
}