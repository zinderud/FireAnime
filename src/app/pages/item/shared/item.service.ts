import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from "angularfire2/database";
import { Item } from "./item";
@Injectable()
export class ItemService {
  private basePath: string = "/items";
  items: FirebaseListObservable<Item[]> = null; // item listesi
  item: FirebaseObjectObservable<Item> = null; //tek item
  constructor(private db: AngularFireDatabase) {}

  //tek item dön
  getItem(key: string): FirebaseObjectObservable<Item> {
    const path = `${this.basePath}/${key}`;
    this.item = this.db.object(path);
    return this.item;
  }

  //örnek sorgu getItemsList({limitToLast: 5})
  getItemsList(query = {}): FirebaseListObservable<Item[]> {
    this.items = this.db.list("/items", {
      query: query
    });

    return this.items;
  }

  //yeni item oluştur
  createItem(item: Item): void {
    this.items.push(item)
    .catch(error => this.handleError(error));
  }

  //güncelle itemslerin içinde keyi bulur ve düzenler
  updateItem(key:string,value:any):void{
      this.items.update(key,value)
      .catch(error=>this.handleError(error));
  }
    //itemsler içinde keye göre siler
  deleteItem(key: string): void {
      this.items.remove(key)
        .catch(error => this.handleError(error))
  }
//bütün itemleri sil
  deleteAll(): void {
      this.items.remove()
        .catch(error => this.handleError(error))
  }

  //hata olursa TODO:hatayı bildir notification ile
  private handleError(error) {
    console.log(error);
  }
}
