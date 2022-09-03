import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {

  constructor(private auth: AuthService, private router: Router, private storage: Storage) { }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');
    
    setTimeout(() => {
      this.router.navigateByUrl('/user-dashboard');
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

   signOut(){
     this.auth.signOut();
   } 
   slideOpts = {
    initialSlide: 1,
    speed: 100,
    slidesPerView: 1,
    autoplay: true
  };

   public segmentChanged (event: any): void {
    this.storage.set('icono', null);

    console.log(JSON.stringify(event));
    console.log(JSON.stringify(event.detail.value));
   
    this.storage.set('icono',event.detail.value);
      
    
  
    }
}
