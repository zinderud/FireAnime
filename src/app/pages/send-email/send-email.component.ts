import { Component ,OnInit} from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  constructor(private http: Http) { }

  sendEmail() {

    let url = `https://your-cloud-function-url/function`
    let params: URLSearchParams = new URLSearchParams();
    let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

    params.set('to', 'user@example.com');
    params.set('from', 'you@yoursupercoolapp.com');
    params.set('subject', 'test-email');
    params.set('content', 'Hello World');

    return this.http.post(url, params, headers)
                    .toPromise()
                    .then( res => {
                      console.log(res)
                    })
                    .catch(err => {
                      console.log(err)
                    })

  }
                  ngOnInit(){
                    
                  }

}