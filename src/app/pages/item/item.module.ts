import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ItemService } from './shared/item.service';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemFormComponent } from './item-form/item-form.component';

@NgModule({
  imports: [
     CommonModule,
 
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule
  ],
  declarations: [ItemListComponent, ItemDetailComponent, ItemFormComponent],
   providers: [
    ItemService
  ],
  exports:[ItemListComponent, ItemDetailComponent, ItemFormComponent],
})
export class ItemModule { }
