import { Component, OnInit,AfterViewInit} from '@angular/core';
import {MapService} from './../../../services/map.service';
import {IActivity} from './../../../shared/activity.model';
import{ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],providers:[MapService]
})
export class MapComponent implements OnInit {

  constructor(private _mapService:MapService,private _route:ActivatedRoute) { }

  activity:any;
  activityName:string;
  activityComments:string;
  activityDate:Date;
  actvitiyDistance:number;
  gpx:any;

  ngOnInit() {
    this.activity = this._mapService.getActivity(+this._route.snapshot.params['id'])
  }

ngAfterViewInit(){
  this._mapService.plotActivity(+this._route.snapshot.params['id']);
  this.activityName = this.activity.name;
  this.activityComments = this.activity.comments;
  this.actvitiyDistance = this.activity.distance;
  this.activityDate = this.activity.date;
  this.gpx = this.activity.gpxDate
}
}
