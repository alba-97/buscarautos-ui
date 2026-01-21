import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Input() brands: string[] = [];
  @Input() maxPrice = 0;
  @Input() selectedBrand = '';
  @Input() priceRange: [number, number] = [0, 0];
  @Input() searchTerm = '';

  @Output() brandChange = new EventEmitter<string>();
  @Output() priceRangeChange = new EventEmitter<[number, number]>();
  @Output() searchChange = new EventEmitter<string>();

  get minPercent(): number {
    if (!this.maxPrice) return 0;
    return (this.priceRange[0] / this.maxPrice) * 100;
  }

  get maxPercent(): number {
    if (!this.maxPrice) return 100;
    return (this.priceRange[1] / this.maxPrice) * 100;
  }

  onMinPrice(value: number): void {
    const min = Math.min(value, this.priceRange[1] - 1);
    this.priceRangeChange.emit([min, this.priceRange[1]]);
  }

  onMaxPrice(value: number): void {
    const max = Math.max(value, this.priceRange[0] + 1);
    this.priceRangeChange.emit([this.priceRange[0], max]);
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  }
}
