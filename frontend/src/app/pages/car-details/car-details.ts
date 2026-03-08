import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarService } from '../../services/car';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-details.html',
  styleUrl: './car-details.css'
})
export class CarDetailsComponent implements OnInit {
  car: any = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCarDetails();
  }

  /**
   * Charger les détails d'une voiture
   */
  loadCarDetails(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    
    if (carId) {
      this.carService.getCarById(carId).subscribe({
        next: (data) => {
          this.car = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la voiture', err);
          this.error = 'Erreur lors du chargement des détails de la voiture';
          this.loading = false;
        }
      });
    }
  }

  /**
   * Réserver cette voiture
   */
  bookCar(): void {
    if (this.car) {
      this.router.navigate(['/booking', this.car.id]);
    }
  }

  /**
   * Retour à la liste
   */
  goBack(): void {
    this.router.navigate(['/cars']);
  }
}
