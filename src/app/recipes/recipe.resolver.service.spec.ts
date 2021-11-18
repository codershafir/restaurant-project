import { TestBed } from '@angular/core/testing';

import { Recipe.ResolverService } from './recipe.resolver.service';

describe('Recipe.ResolverService', () => {
  let service: Recipe.ResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Recipe.ResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
