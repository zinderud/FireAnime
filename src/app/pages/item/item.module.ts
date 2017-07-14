import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ItemService } from './shared/item.service';
import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  imports: [
     CommonModule,
 
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule
  ],
  declarations: [ItemListComponent],
   providers: [
    ItemService
  ]
})
export class ItemModule { }
