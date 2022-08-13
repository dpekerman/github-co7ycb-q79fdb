import { Component, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { Book } from '../models/book';

import { DataResult } from '@progress/kendo-data-query';

@Component({
  selector: 'bc-book-preview-list',
  template: `
    <kendo-grid [data]="books" 
      [skip]="skip"
      [pageSize]="pageSize"
      (pageChange)="pageChange.emit($event)" 
      [pageable]="true">
      <kendo-grid-span-column>
        <kendo-grid-column field="volumeInfo.title" title="Title"></kendo-grid-column>
        <kendo-grid-column field="volumeInfo.author" title="Author"></kendo-grid-column>
        <kendo-grid-column field="volumeInfo.description" title="Description"></kendo-grid-column>
         <ng-template kendoGridCellTemplate let-dataItem>
            <bc-book-preview [book]="dataItem"></bc-book-preview>
        </ng-template>
      </kendo-grid-span-column>
    </kendo-grid>
  `,
  styles: [
    `
    bc-book-preview mat-card.mat-card {
      width: 100%;
      margin: 0px;
    }
    `
  ]
})
export class BookPreviewListComponent {
  @Input() books: DataResult;
  @Input() skip: number;
  @Input() pageSize: number;

  @Output() pageChange: EventEmitter<{skip: number, take: number}> = new EventEmitter();
}
