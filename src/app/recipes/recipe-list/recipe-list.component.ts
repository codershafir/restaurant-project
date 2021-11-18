import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeList: RecipeModel[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(recipeList=>{
      this.recipeList = recipeList
    })
    this.recipeList = this.recipeService.getRecipeList();
  }

  onClickNewRecipe(){
    this.router.navigate(['new'],{relativeTo: this.activatedRoute});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
