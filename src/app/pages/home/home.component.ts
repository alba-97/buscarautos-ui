import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, catchError } from 'rxjs/operators';
import { CarsService } from '../../services/cars.service';
import { Car } from '../../interfaces/cars';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarCardComponent, FiltersComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private carsService = inject(CarsService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  cars = signal<Car[]>([]);
  brands = signal<string[]>([]);
  loading = signal(true);
  total = signal(0);
  page = signal(1);
  maxPrice = signal(0);
  selectedBrand = signal('');
  priceRange = signal<[number, number]>([0, 0]);
  searchTerm = signal('');

  private search$ = new Subject<string>();
  private debouncedSearch = '';

  totalPages = computed(() => Math.ceil(this.total() / 6));

  ngOnInit(): void {
    combineLatest([
      this.carsService.getBrands().pipe(catchError(() => of([]))),
      this.carsService.getMaxPrice().pipe(catchError(() => of(0)))
    ]).pipe(takeUntil(this.destroy$)).subscribe(([brands, maxPrice]) => {
      this.brands.set(brands);
      this.maxPrice.set(maxPrice);
      this.priceRange.set([0, maxPrice]);
      this.loadCars();
    });

    this.search$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      this.debouncedSearch = term;
      this.page.set(1);
      this.loadCars();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCars(): void {
    this.loading.set(true);
    this.carsService.getCars({
      brand: this.selectedBrand() || undefined,
      minPrice: this.priceRange()[0],
      maxPrice: this.priceRange()[1],
      search: this.debouncedSearch || undefined,
      page: this.page()
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data, total }) => {
        this.cars.set(data);
        this.total.set(total);
        this.loading.set(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: () => { this.loading.set(false); }
    });
  }

  onBrandChange(brand: string): void {
    this.selectedBrand.set(brand);
    this.page.set(1);
    this.loadCars();
  }

  onPriceRangeChange(range: [number, number]): void {
    this.priceRange.set(range);
    this.page.set(1);
    this.loadCars();
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.search$.next(term);
  }

  onCardClick(car: Car): void {
    this.router.navigate(['/cars', car.id]);
  }

  prevPage(): void {
    if (this.page() > 1) { this.page.update(p => p - 1); this.loadCars(); }
  }

  nextPage(): void {
    if (this.page() < this.totalPages()) { this.page.update(p => p + 1); this.loadCars(); }
  }
}
