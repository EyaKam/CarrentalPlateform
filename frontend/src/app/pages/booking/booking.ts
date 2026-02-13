import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  car: any = null;
  loading: boolean = true;
  submitting: boolean = false;
  error: string = '';
  successMessage: string = '';

  /**
   * Calculer le nombre de jours entre deux dates
   */
  getDaysBetween(): number {
    const startDate = this.bookingForm.get('startDate')?.value;
    const endDate = this.bookingForm.get('endDate')?.value;

    if (!startDate || !endDate) {
      return 0;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  }

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCarDetails();
  }

  /**
   * Charger les détails de la voiture à réserver
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
          this.error = 'Erreur lors du chargement de la voiture';
          this.loading = false;
        }
      });
    }
  }

  /**
   * Calculer le prix total
   */
  calculateTotalPrice(): number {
    if (!this.bookingForm.get('startDate')?.value || !this.bookingForm.get('endDate')?.value) {
      return 0;
    }

    const startDate = new Date(this.bookingForm.get('startDate')?.value);
    const endDate = new Date(this.bookingForm.get('endDate')?.value);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return 0;
    }

    return days * (this.car?.pricePerDay || 0);
  }

  /**
   * Soumettre la réservation
   */
  onSubmit(): void {
    if (this.bookingForm.valid && this.car) {
      this.submitting = true;
      this.error = '';
      this.successMessage = '';

      // Récupérer l'utilisateur depuis le localStorage
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;

      if (!user || !user.id) {
        this.error = 'Vous devez être connecté pour réserver une voiture';
        this.submitting = false;
        this.router.navigate(['/login']);
        return;
      }

      const booking = {
        userId: user.id,
        carId: this.car.id,
        startDate: new Date(this.bookingForm.get('startDate')?.value),
        endDate: new Date(this.bookingForm.get('endDate')?.value),
        totalPrice: this.calculateTotalPrice(),
        bookingStatus: 'PENDING'
      };

      this.bookingService.createBooking(booking).subscribe({
        next: (response) => {
          console.log('Réservation créée avec succès !', response);
          this.successMessage = 'Réservation créée avec succès !';
          this.submitting = false;
          
          // Rediriger après un délai
          setTimeout(() => {
            this.router.navigate(['/cars']);
          }, 2000);
        },
        error: (err) => {
          console.error('Erreur lors de la réservation', err);
          this.error = 'Erreur lors de la réservation. Veuillez réessayer.';
          this.submitting = false;
        }
      });
    }
  }

  /**
   * Retour à la liste
   */
  goBack(): void {
    this.router.navigate(['/cars']);
  }
}
