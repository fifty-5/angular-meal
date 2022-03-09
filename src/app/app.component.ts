import { Component, OnInit } from '@angular/core';
import { MealService } from './services/meal.service';
import { Meal } from './models/meal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  meals: Meal[] = [];
  constructor(public mealService: MealService) {}

  ngOnInit(): void {
    (async () => {
      this.meals = await this.mealService.getMeals();
    })();
  }
}
