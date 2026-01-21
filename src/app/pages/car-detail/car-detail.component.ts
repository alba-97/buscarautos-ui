import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CarsService } from '../../services/cars.service';
import { Car } from '../../interfaces/cars';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CurrencyPipe, LoadingComponent],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss'
})
export class CarDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private carsService = inject(CarsService);

  car = signal<Car | null>(null);
  loading = signal(true);
  notFound = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.carsService.getCarById(id).subscribe({
      next: (car) => { this.car.set(car); this.loading.set(false); },
      error: () => { this.notFound.set(true); this.loading.set(false); }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
