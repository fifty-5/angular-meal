import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  constructor() {}

  async getMealRandom(search: string = ''): Promise<Meal> {
    const data = await this.fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );

    return data[0];
  }

  async getMeal(id: any = ''): Promise<Meal> {
    const data = await this.fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    return data[0];
  }

  async getMeals(search: string = ''): Promise<Meal[]> {
    const data = await this.fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );

    return data;
  }

  /**
   * Formateo los ingredientes y las cantidades para generar un array
   * y en la vista solo sea presentacional
   *
   * @param meals
   * @returns
   */
  private formatIngredients(meals: any): Meal[] {
    return meals.map((meal: any) => {
      const ingredientAndQuantity = [];
      for (let index = 1; index <= 20; index++) {
        const ingredientKey = `strIngredient${index}`;
        const measureKey = `strMeasure${index}`;

        if (
          meal.hasOwnProperty(measureKey) &&
          meal[measureKey] &&
          typeof meal[measureKey] === 'string' &&
          meal.hasOwnProperty(ingredientKey) &&
          meal[ingredientKey] &&
          typeof meal[ingredientKey] === 'string'
        ) {
          ingredientAndQuantity.push(
            `${meal[ingredientKey].trim()} - ${meal[measureKey.trim()]}`
          );
        }
      }
      return {
        ...meal,
        ingredientAndQuantity,
      };
    });
  }

  /**
   * Use fetch dado que no vi necesario en el requerimiento si solo se usa el method get
   * una libreria menos que instalar si no es necesario
   *
   * @param url
   * @returns
   */
  private fetch(url: string): Promise<Meal[]> {
    return new Promise<Meal[]>((resolve, reject) => {
      try {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const meals = data?.meals || [];
            resolve(this.formatIngredients(meals));
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}
