import {IActivity} from './activity.model';

export const SAVED_ACTIVITIES : IActivity[] = [

  {
    "id":1,
    "name": "bisiklet turu",
    "date": new Date ('07/07/2017'),
    "distance":6.2,
    "comments":"hava güzel, rüzgar yok",
    "gpxData":'../../assets/gpx/1.gpx'
  },
  {
    "id":2,
    "name":"park kenarı",
    "date": new Date('07/08/2017'),
    "gpxData":'../../assets/gpx/2.gpx',
    "distance":1.2,
    "comments":'soğuk ve rüzgarlı.'
  },
  {
    "id": 3,
    "name":'orman yolu',
    "date": new Date('07/09/2017'),
    "gpxData":'../../assets/gpx/3.gpx',
    'distance':3.2,
    "comments":'koşmak için uygun'
  },
  {
    "id":4,
    "name":'göl kenarı',
    "date": new Date('07/10/2017'),
    "gpxData": '../../assets/gpx/4.gpx',
    "distance":8.4,
    "comments":'rüzgarlı'
  }
]
