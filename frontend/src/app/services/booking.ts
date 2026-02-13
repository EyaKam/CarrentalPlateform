import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) { }

  /**
   * Créer une nouvelle réservation
   */
  createBooking(booking: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, booking);
  }

  /**
   * Obtenir toutes les réservations (Admin)
   */
  getAllBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  /**
   * Obtenir une réservation par ID
   */
  getBookingById(bookingId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${bookingId}`);
  }

  /**
   * Obtenir les réservations d'un utilisateur
   */
  getBookingsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  /**
   * Obtenir les réservations d'une voiture
   */
  getBookingsByCarId(carId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/car/${carId}`);
  }

  /**
   * Confirmer une réservation
   */
  confirmBooking(bookingId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookingId}/confirm`, {});
  }

  /**
   * Rejeter une réservation
   */
  rejectBooking(bookingId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookingId}/reject`, {});
  }

  /**
   * Annuler une réservation
   */
  cancelBooking(bookingId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookingId}/cancel`, {});
  }

  /**
   * Supprimer une réservation (Admin only)
   */
  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bookingId}`);
  }
}
