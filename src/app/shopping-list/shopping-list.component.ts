import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientList: IngredientModel[];
  private ingredientsAddedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredientList = this.shoppingListService.getIngredientList();
    this.ingredientsAddedSubscription = this.shoppingListService.ingredientsAdded.subscribe(
      (ingredientList: IngredientModel[]) => {
        this.ingredientList = ingredientList;
      }
    );
  }

  ngOnDestroy() {
    this.ingredientsAddedSubscription.unsubscribe();
  }

  onEditItem(index:number) {
this.shoppingListService.startedEditing.next(index);
  }
}
