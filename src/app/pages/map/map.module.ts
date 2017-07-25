import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 import{ RouterModule } from '@angular/router';
import {MapService} from './../../services/map.service';
import {MapComponent} from './map/map.component'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MapComponent }
    ])
  ],
  declarations: [MapComponent],
  providers:[MapService]
}) 
export class MapModule { }
