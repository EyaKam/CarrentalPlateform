import { TestBed } from '@angular/core/testing';
import { CarDetailsComponent } from './car-details';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CarService } from '../../services/car';

describe('CarDetailsComponent', () => {
  let component: CarDetailsComponent;
  let carService: CarService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetailsComponent, HttpClientTestingModule],
      providers: [
        CarService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    component = TestBed.createComponent(CarDetailsComponent).componentInstance;
    carService = TestBed.inject(CarService);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load car details on init', () => {
    const mockCar = {
      id: '1',
      brand: 'BMW',
      model: 'M4',
      pricePerDay: 399,
      year: 2023,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    };

    spyOn(carService, 'getCarById').and.returnValue(of(mockCar));

    component.ngOnInit();

    expect(carService.getCarById).toHaveBeenCalledWith('1');
    expect(component.car).toEqual(mockCar);
    expect(component.loading).toBe(false);
  });
});
