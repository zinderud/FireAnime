import { Injectable, Inject } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { Bolum } from "./bolum";
import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from "angularfire2";
import { Http } from "@angular/http";
import { environment } from "../../../../environments/environment";

@Injectable()
export class BolumService {
  sdkDb: any;
  constructor(
    private db: AngularFireDatabase,
    @Inject(FirebaseApp) fb: FirebaseApp,
    private http: Http
  ) {
    this.sdkDb = fb.database();
  }

findAllBolum():Observable<Bolum[]>{
    return this.db.list("bolumler")
    .do(console.log)
    .map(Bolum.fromJsonList);
}

}
