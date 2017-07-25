import { Injectable } from '@angular/core';
import {IActivity} from '../shared/activity.model'
import {SAVED_ACTIVITIES} from '../shared/activites'

@Injectable()
export class ActivityService {

  constructor() { }

getActivites(): IActivity[]{
  return SAVED_ACTIVITIES.slice(0);

}
getTotalActivites(allActivites : IActivity[]){

return allActivites.length;

}


getTotalDistance(allActivites:IActivity[]){

var totalDistance =0;

for(var i = 0 ;  i < allActivites.length; i++){
  totalDistance+= allActivites[i].distance;
}
return totalDistance;

}

getFirstDate(allActivites: IActivity []){

  var earliestDate = new Date ('01/01/9999');

  for(var i = 0; i<allActivites.length; i++){
    var currentDate = allActivites[i].date;
    if(currentDate < earliestDate){
      earliestDate = currentDate;
    }
  }

  return earliestDate;

}

}
