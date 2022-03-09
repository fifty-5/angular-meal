import { Component, OnInit } from '@angular/core';
import { MealService } from 'src/app/services/meal.service';
import { Meal } from 'src/app/models/meal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css'],
})
export class MealComponent implements OnInit {
  meal: Meal;
  constructor(public mealService: MealService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;

    (async () => {
      this.meal = await this.mealService.getMeal(routeParams.get('mealId'));
    })();
  }
}
