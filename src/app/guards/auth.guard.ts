import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  
  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    var role ='';
    const expectedRole = next.data.role;
    console.log('esperado ',expectedRole);
    return this.auth.user.pipe(
      take(1),
      map(user =>{
        console.log('log ', user);
        if(user){
          for(let elemento of user) { 
          role = elemento['rol_cod_cargo'];
            
          }
          console.log('rol ', role); 
            console.log('contra', expectedRole);
            console.log(expectedRole == role);
            if(expectedRole == role){
              return true;
            }else{
              this.showAlert();
              return this.router.parseUrl('/login');
            }
          
          
        }else{
          this.showAlert();
          return this.router.parseUrl('/login');
        }
        
      }) 
    )
  }


  async showAlert(){
  let alert = await this.alertCtrl.create({
    header: 'Disculpa las molestias.',
    message: 'Tu email &/O contraseña no son correctas ',
    buttons: ['OK']

  });
  alert.present();
  }


  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
