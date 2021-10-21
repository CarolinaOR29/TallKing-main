import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.page.html',
  styleUrls: ['./driver-dashboard.page.scss'],
})
export class DriverDashboardPage implements OnInit {

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');
    
    setTimeout(() => {
      this.router.navigateByUrl('/driver-dashboard');
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

   signOut(){
     this.auth.signOut();
   } 
}
