import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { RecipeModel } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) {}

  saveRecipes() {
    const recipeList = this.recipeService.getRecipeList();
    this.httpClient
      .put(
        'https://angular-restaurant-project-default-rtdb.firebaseio.com/recipes.json',
        recipeList
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.httpClient
      .get(
        'https://angular-restaurant-project-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes:RecipeModel[]) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          })
        }),
        tap(recipes=>{
          this.recipeService.setRecipe(recipes);
        })
      )
  }
}
