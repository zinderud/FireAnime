import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ani",
  templateUrl: "./ani.component.html",
  styleUrls: ["./ani.component.scss"]
})
export class AniComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  //promise usage

  public gelbakalim() {
    let sonuc = false;
    let islem = new Promise((resolve, reject) => {
      if (sonuc) {
        resolve("basarılı");
      } else {
        reject("basarısız");
      }
    });
    islem
      .then(data => {
        console.log(data);
      })
      .catch(data => {
        console.log(data);
      });
  }
}
