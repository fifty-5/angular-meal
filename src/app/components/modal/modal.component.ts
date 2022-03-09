import { Component, ElementRef, OnInit } from '@angular/core';
import { MealService } from 'src/app/services/meal.service';
import { Meal } from 'src/app/models/meal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  meal: Meal;

  constructor(private el: ElementRef, public mealService: MealService) {}
  ngOnInit() {
    (async () => {
      this.meal = await this.mealService.getMealRandom();
    })();

    this.el.nativeElement.addEventListener('click', () => {
      this.close();
    });
  }
  close() {
    this.el.nativeElement.classList.remove('visible');
    this.el.nativeElement.classList.add('invisible');

    console.log('leave');
  }
}
