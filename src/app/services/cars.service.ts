import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Car, ApiResponse, CarFilters } from '../interfaces/cars';

@Injectable({ providedIn: 'root' })
export class CarsService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getCars(filters: CarFilters = {}): Observable<ApiResponse<Car>> {
    let params = new HttpParams();
    if (filters.brand) params = params.set('brand', filters.brand);
    if (filters.minPrice !== undefined) params = params.set('minPrice', filters.minPrice);
    if (filters.maxPrice !== undefined) params = params.set('maxPrice', filters.maxPrice);
    if (filters.search) params = params.set('search', filters.search);
    if (filters.page !== undefined) params = params.set('page', filters.page);
    return this.http.get<ApiResponse<Car>>(`${this.baseUrl}/cars`, { params });
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/cars/${id}`);
  }

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/cars/brands`);
  }

  getMaxPrice(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/cars/max-price`);
  }
}
