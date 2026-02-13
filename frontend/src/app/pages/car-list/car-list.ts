import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './car-list.html',
  styleUrl: './car-list.css'
})
export class CarListComponent implements OnInit {
  cars: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private carService: CarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCars();
  }

  /**
   * Charger les voitures depuis le backend
   */
  loadCars(): void {
    this.carService.getAllCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des voitures', err);
        this.error = 'Erreur lors du chargement des voitures';
        this.loading = false;
        // Fallback avec données fictives en cas d'erreur
        this.loadFallbackCars();
      }
    });
  }

  /**
   * Charger les voitures par défaut si API est unavailable
   */
  loadFallbackCars(): void {
    this.cars = [
      {
        id: '1',
        brand: 'Toyota',
        model: 'Corolla',
        pricePerDay: 50,
        image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop',
        available: true
      },
      {
        id: '2',
        brand: 'Tesla',
        model: 'Model 3',
        pricePerDay: 120,
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop',
        available: true
      },
      {
        id: '3',
        brand: 'BMW',
        model: 'X5',
        pricePerDay: 150,
        image: 'https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=2080&auto=format&fit=crop',
        available: false
      }
    ];
  }

  /**
   * Réserver une voiture
   */
  bookCar(carId: string): void {
    // TODO: Rediriger vers la page de réservation avec l'ID de la voiture
    this.router.navigate(['/booking', carId]);
  }

  /**
   * Voir les détails d'une voiture
   */
  viewCarDetails(carId: string): void {
    // TODO: Naviguer vers la page des détails de la voiture
    this.router.navigate(['/car-details', carId]);
  }
}