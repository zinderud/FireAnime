import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item';
import { FirebaseListObservable } from 'angularfire2/database';
import { ItemService } from '../shared/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {



  items:FirebaseListObservable<Item[]>;
  constructor(private itemServis:ItemService ) { }
  ngOnInit() {
    //bak https://github.com/angular/angularfire2/blob/master/docs/4-querying-lists.md
    this.items=this.itemServis.getItemsList({limitToLast: 5})
  }

  deleteItems(){
    this.itemServis.deleteAll();
  }

}
