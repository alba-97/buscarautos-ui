import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Car } from '../../interfaces/cars';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss'
})
export class CarCardComponent {
  @Input({ required: true }) car!: Car;
  @Output() cardClick = new EventEmitter<Car>();
}
