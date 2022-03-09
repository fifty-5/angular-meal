import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { Meal } from '../../models/meal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  meals: Meal[] = [];
  constructor(public mealService: MealService) {}

  ngOnInit(): void {
    (async () => {
      this.meals = await this.mealService.getMeals();
    })();
  }
}
