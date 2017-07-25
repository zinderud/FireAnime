import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpModule } from '@angular/http';
///// Start FireStarter
import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AniComponent } from './pages/ani/ani.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';


  

export const firebaseConfig = environment.firebaseConfig;
@NgModule({
  declarations: [AppComponent, AniComponent, SendEmailComponent],
  imports: [
    BrowserModule,   HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
