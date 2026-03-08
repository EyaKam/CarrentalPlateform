import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/cars';

  constructor(private http: HttpClient) { }

  /**
   * Ajouter une nouvelle voiture (pour les propriétaires)
   */
  addCar(car: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, car);
  }

  /**
   * Obtenir toutes les voitures
   */
  getAllCars(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  /**
   * Obtenir une voiture par ID
   */
  getCarById(carId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${carId}`);
  }

  /**
   * Obtenir les voitures d'un propriétaire
   */
  getCarsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/owner/${userId}`);
  }

  /**
   * Mettre à jour une voiture
   */
  updateCar(carId: string, car: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${carId}`, car);
  }

  /**
   * Supprimer une voiture
   */
  deleteCar(carId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${carId}`);
  }

  /**
   * Vérifier la disponibilité d'une voiture
   */
  checkAvailability(carId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${carId}/availability`);
  }
}
