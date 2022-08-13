import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take, tap } from 'rxjs/operators';

import { process, DataResult } from '@progress/kendo-data-query';

import * as fromBooks from '../reducers';
import * as book from '../actions/book';
import { Book } from '../models/book';

@Component({
  selector: 'bc-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-search [query]="searchQuery$ | async" [searching]="loading$ | async" [error]="error$ | async" (search)="search($event)"></bc-book-search>
    <bc-book-preview-list
     (pageChange)="page($event)" 
     [books]="books$ | async"
     [skip]="skip$ | async"
     [pageSize]="pageSize$ | async">
    </bc-book-preview-list>
  `,
})
export class FindBookPageComponent {
  searchQuery$: Observable<string>;
  books$: Observable<DataResult>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  skip$: Observable<number>;
  pageSize$: Observable<number>;


  constructor(private store: Store<fromBooks.State>) {
    this.searchQuery$ = store.pipe(select(fromBooks.getSearchQuery), take(1));
    this.books$ = store.pipe(
      select(fromBooks.getSearchResults), 
    );

    this.loading$ = store.pipe(select(fromBooks.getSearchLoading));
    this.error$ = store.pipe(select(fromBooks.getSearchError));

    this.skip$ = store.pipe(select(fromBooks.getSearchSkip));
    this.pageSize$ = store.pipe(select(fromBooks.getSearchPageSize));
  }

  search(query: string) {
    this.store.dispatch(new book.Search({query}));
  }

  page({skip, take}) {
    this.store.dispatch(new book.Search({ skip, take }));
  }
}
