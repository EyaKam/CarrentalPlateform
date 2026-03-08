import { TestBed } from '@angular/core/testing';
import { CarService } from './car';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CarService', () => {
  let service: CarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarService]
    });
    service = TestBed.inject(CarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all cars', () => {
    const mockCars = [
      { id: '1', brand: 'BMW', model: 'M4', pricePerDay: 399 },
      { id: '2', brand: 'Mercedes', model: 'AMG', pricePerDay: 450 }
    ];

    service.getAllCars().subscribe(cars => {
      expect(cars.length).toBe(2);
      expect(cars).toEqual(mockCars);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cars');
    expect(req.request.method).toBe('GET');
    req.flush(mockCars);
  });

  it('should get car by id', () => {
    const mockCar = { id: '1', brand: 'BMW', model: 'M4', pricePerDay: 399 };

    service.getCarById('1').subscribe(car => {
      expect(car).toEqual(mockCar);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cars/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCar);
  });

  it('should add a car', () => {
    const newCar = { brand: 'Tesla', model: 'Model S', pricePerDay: 500, userId: 'user1' };
    const mockResponse = { id: '3', ...newCar };

    service.addCar(newCar).subscribe(car => {
      expect(car).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cars');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should update a car', () => {
    const updatedCar = { brand: 'BMW', model: 'M4 Competition', pricePerDay: 450, userId: 'user1' };
    const mockResponse = { id: '1', ...updatedCar };

    service.updateCar('1', updatedCar).subscribe(car => {
      expect(car).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cars/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should delete a car', () => {
    service.deleteCar('1').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cars/1');
    expect(req.request.method).toBe('DELETE');
  });
});
