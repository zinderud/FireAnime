import { Component, OnInit, Input} from '@angular/core';
import {ItemService} from '../shared/item.service';
import {Item} from '../shared/item';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
@Input() item:Item;
  constructor(private itemservis:ItemService) { }

  ngOnInit() {
  }

  updateActive(value:boolean){
    this.itemservis.updateItem(this.item.$key,{active:value})
  }
  deleteItem(){
    this.itemservis.getItem(this.item.$key);
  }
}
