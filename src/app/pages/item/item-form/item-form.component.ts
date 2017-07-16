import { Component, OnInit, OnDestroy } from "@angular/core";
import { Item } from "../shared/item";
import { ItemService } from "../shared/item.service";

import { Subscription } from "rxjs/Subscription";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-item-form",
  templateUrl: "./item-form.component.html",
  styleUrls: ["./item-form.component.scss"]
})
export class ItemFormComponent implements OnInit {
  public complexForm: FormGroup;

  item: Item = new Item();
  /* */

  constructor(
    private itemServis: ItemService,
    private _formBuilder: FormBuilder
  ) {
    this.complexForm = _formBuilder.group({
      title: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      body: [
        null,
        Validators.compose([
          Validators.required,
          //Validators.pattern("[a-z]"),
           Validators.minLength(3)
        ])
      ],
      active:[true ]
    });
  }
  ngOnInit() {}
  //yeni item olustur ve item nesnesini sıfırla
 public submitForm(value){

    if(!value.title|| !value.title){return;}
    if(this.complexForm.status==="VALID"){
    
         this.itemServis.createItem(value);
             this.complexForm.reset()
    }
  }
}
