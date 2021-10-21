import { Injectable } from '@angular/core';

import {throwError} from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  server: string = "https://dcrecicla.site/DCRecicla/rest/index.php/"; // default
	// if you test in real device "http://localhost" change use the your IP	
    // server: string = "http://192.199.122.100/IONIC4_CRUD_LOGINREGIS_PHP_MYSQL/server_api/"; 

	constructor(public http : HttpClient) {

	}
 
	postData(body, file){
	 
		
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'text/javascript'
        })
     
    }
    return this.http.post(this.server + file, JSON.stringify(body), options).pipe(
      map(res =>res),
       catchError(error => throwError(error.message || error))
      
    );
 
	}
}
