import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeModel } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<RecipeModel[]>{

  constructor(private dataStorageService: DataStorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RecipeModel[] | Observable<RecipeModel[]> | Promise<RecipeModel[]> {
    return this.dataStorageService.fetchRecipes();
  }

}
