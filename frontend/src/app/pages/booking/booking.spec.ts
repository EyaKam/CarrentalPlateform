import { TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CarService } from '../../services/car';
import { BookingService } from '../../services/booking';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let carService: CarService;
  let bookingService: BookingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingComponent, HttpClientTestingModule],
      providers: [
        CarService,
        BookingService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    component = TestBed.createComponent(BookingComponent).componentInstance;
    carService = TestBed.inject(CarService);
    bookingService = TestBed.inject(BookingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load car details on init', () => {
    const mockCar = {
      id: '1',
      brand: 'BMW',
      model: 'M4',
      pricePerDay: 399
    };

    spyOn(carService, 'getCarById').and.returnValue(of(mockCar));

    component.ngOnInit();

    expect(carService.getCarById).toHaveBeenCalledWith('1');
    expect(component.car).toEqual(mockCar);
    expect(component.loading).toBe(false);
  });

  it('should calculate total price correctly', () => {
    component.car = { pricePerDay: 100 };
    component.bookingForm.patchValue({
      startDate: '2024-01-01',
      endDate: '2024-01-05'
    });

    const totalPrice = component.calculateTotalPrice();
    expect(totalPrice).toBeGreaterThan(0);
  });
});
