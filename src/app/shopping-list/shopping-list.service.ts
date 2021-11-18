import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IngredientModel } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsAdded = new Subject<IngredientModel[]>();
  startedEditing = new Subject<number>();
  private ingredientList: IngredientModel[] = [
    new IngredientModel('Capsicum',5),
    new IngredientModel('Paneer',10)
  ];

  constructor() { }

  getIngredientList(){
    return this.ingredientList.slice();
  }

  getIngredient(index: number){
    return this.ingredientList[index];
  }

  addIngredientToList(ingredient: IngredientModel){
    this.ingredientList.push(ingredient);
    this.ingredientsAdded.next(this.ingredientList.slice());
  }

  addIngredients(ingredients: IngredientModel[]){
    this.ingredientList.push(...ingredients);
    this.ingredientsAdded.next(this.ingredientList.slice());
  }

  updateIngredient(index: number, ingredient: IngredientModel){
    this.ingredientList[index] = ingredient;
    this.ingredientsAdded.next(this.ingredientList.slice());
  }

  deleteIngredient(index: number){
    this.ingredientList.splice(index, 1);
    this.ingredientsAdded.next(this.ingredientList.slice());
  }
}
