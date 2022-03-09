import { Component, Input } from '@angular/core';
import { Meal } from 'src/app/models/meal';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() meal: Meal;

  constructor() {}

  slice(str: string | undefined) {
    if (!str) return '';

    return str.slice(0, 120);
  }
}
