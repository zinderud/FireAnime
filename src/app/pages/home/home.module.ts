import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import {ItemModule} from './../item/item.module'
@NgModule({
  imports: [
    CommonModule,ItemModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ])
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
