import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import{ActivityListComponent} from './activity-list/activity-list.component'
import {MapService} from './../../services/map.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ActivityListComponent }
    ])
  ],
  declarations: [ActivityListComponent],
    providers:[MapService]
})
export class ActivityListModule { }
