import { TestBed } from '@angular/core/testing';
import { BookingService } from './booking';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BookingService', () => {
  let service: BookingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingService]
    });
    service = TestBed.inject(BookingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all bookings', () => {
    const mockBookings = [
      { id: '1', userId: 'user1', carId: 'car1', bookingStatus: 'PENDING' },
      { id: '2', userId: 'user2', carId: 'car2', bookingStatus: 'CONFIRMED' }
    ];

    service.getAllBookings().subscribe(bookings => {
      expect(bookings.length).toBe(2);
      expect(bookings).toEqual(mockBookings);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/bookings');
    expect(req.request.method).toBe('GET');
    req.flush(mockBookings);
  });

  it('should create a booking', () => {
    const newBooking = { userId: 'user1', carId: 'car1', startDate: new Date(), endDate: new Date(), totalPrice: 800 };
    const mockResponse = { id: '3', bookingStatus: 'PENDING', ...newBooking };

    service.createBooking(newBooking).subscribe(booking => {
      expect(booking).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/bookings');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should confirm a booking', () => {
    const mockResponse = { id: '1', userId: 'user1', carId: 'car1', bookingStatus: 'CONFIRMED' };

    service.confirmBooking('1').subscribe(booking => {
      expect(booking.bookingStatus).toBe('CONFIRMED');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/bookings/1/confirm');
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should reject a booking', () => {
    const mockResponse = { id: '1', userId: 'user1', carId: 'car1', bookingStatus: 'REJECTED' };

    service.rejectBooking('1').subscribe(booking => {
      expect(booking.bookingStatus).toBe('REJECTED');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/bookings/1/reject');
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should cancel a booking', () => {
    const mockResponse = { id: '1', userId: 'user1', carId: 'car1', bookingStatus: 'CANCELLED' };

    service.cancelBooking('1').subscribe(booking => {
      expect(booking.bookingStatus).toBe('CANCELLED');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/bookings/1/cancel');
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should delete a booking', () => {
    service.deleteBooking('1').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/bookings/1');
    expect(req.request.method).toBe('DELETE');
  });
});
