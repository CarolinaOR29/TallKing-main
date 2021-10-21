import { Injectable } from '@angular/core';
//import { resolve } from 'dns';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';


export interface User{
	name: string;
	role: number;

}

const TOKEN_KEY = 'session_storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  user:Observable<any>;
  private authState= new BehaviorSubject(null);
  constructor(private storage: Storage, private router: Router) { 

    this.loadUser();
    this.user = this.authState.asObservable().pipe(
       filter(response => response)
    )
  /**
 * 
 *   
 */
  } 


  loadUser(){
      this.storage.get(TOKEN_KEY).then(data=>{
        console.log('loaded user: ', data);
        if (data){
          this.authState.next(data);
        }else {
          this.authState.next(null);
        }
      });
  }
  signIn(credenciales) : Observable<any>{
      let email = credenciales.email;
      let pw = credenciales.pw;
      let user = null;

      if(email ==='admin'&& pw ==='admin'){
        user = {email, role: 'ADMIN'}
      }else if(email ==='user'&& pw ==='user'){
        user = {email, role: 'USER'}
      }


      this.authState.next(user);

      this.storage.set(TOKEN_KEY, user);

      return of(user);
  }
 


  async signOut(){

    await this.storage.set(TOKEN_KEY, null);
    this.authState.next(null);
    this.router.navigateByUrl('/login')

  }

  login(name:string, pw: string) : Promise<boolean>  {
    return new Promise((resolve, reject) => {

      if(name ==='admin'&& pw ==='admin'){
        this.currentUser = {
          name : name,
          role: 0
           
        };
        resolve(true); 
      }
      else if(name ==='user'&& pw ==='user'){
        this.currentUser = {
          name : name,
          role: 1
           
        };
        resolve(true); 
      }
      else{
        reject(false);
      }
    });
  }


  isLoggedIn(){
    return this.currentUser !=null;
  }

  logout(){
    this.currentUser = null;
  }

  isAdmin(){
    return this.currentUser.role === 0;
  }

  isDriver(){
    return this.currentUser.role ===3;
  }

}