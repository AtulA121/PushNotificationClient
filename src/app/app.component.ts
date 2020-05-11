import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker'
import { HttpClient } from '@angular/common/http';

const VAPID_PUBLIC ='BJXHzJbAv88mOxIY-ZfWwqhq65CBnmmTUEqG8DpT18CeLfXooirhES_5MSZK-2skflD-PpCBesAWjy_Ruv5_cQU';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-push-notifications';
  
  constructor(swPush: SwPush,private _http : HttpClient){   
    console.log("---- : ",swPush.isEnabled," , ",swPush);
    
      swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC,
      })
      .then(subscription => {
        // send subscription to the server
        console.log("----- : ",subscription);
        this._http.post("http://localhost:3000/subscribe",subscription).subscribe(res=>{
          console.log("message is  : ",res);
        });
      })
      .catch((err)=>{
        console.log("--- err : ",err);
      });
  }

}
