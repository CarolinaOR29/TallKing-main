import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  server: string = "https://sieit.net/TallKing/v1/tallkadm/rest/index.php/"; 

  constructor(public http : HttpClient) {

	}
  
	postData(body, file){
	 
	
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'text/javascript'
        })
     
     
    }
    return this.http.post(this.server + file, JSON.stringify(body),{responseType: 'json'}  ).pipe(
      map(res =>res),
       catchError(error => throwError(error.message || error))
      
    );
 
	}
}


