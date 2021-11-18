import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeModel } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<RecipeModel[]>();

  private recipeList: RecipeModel[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipeList(){
    return this.recipeList.slice();
  }

  getRecipe(index: number){
    return this.recipeList[index];
  }

  setRecipe(recipeList: RecipeModel[]){
    this.recipeList = recipeList;
    this.recipesChanged.next(this.recipeList.slice());
  }

  addIngredientsToShoppingList(ingredients: IngredientModel[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(newRecipe: RecipeModel){
    this.recipeList.push(newRecipe);
    this.recipesChanged.next(this.recipeList.slice());
  }

  updateRecipe(index: number, newRecipe: RecipeModel){
    this.recipeList[index] = newRecipe;
    this.recipesChanged.next(this.recipeList.slice());
  }

  deleteRecipe(index: number){
    this.recipeList.splice(index, 1);
    this.recipesChanged.next(this.recipeList);
  }
}
