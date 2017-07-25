import { Component, OnInit } from '@angular/core';
import {IActivity} from './../../../shared/activity.model';
import {ActivityService} from './../../../services/activity.service'

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  activites: IActivity[];
  totalActivies:number
  totalDistance:number
  firstDate: Date


  constructor(private _activityService:ActivityService) { }

  ngOnInit() {
    this.activites = this._activityService.getActivites();
    this.totalActivies = this._activityService.getTotalActivites(this.activites);
    this.totalDistance = this._activityService.getTotalDistance(this.activites);
    this.firstDate = this._activityService.getFirstDate(this.activites);
  }

}
