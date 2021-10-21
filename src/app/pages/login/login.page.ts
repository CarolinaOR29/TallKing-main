import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PostService } from 'src/app/services/post.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  implements OnInit{
  user={
    email: '',
    pw: ''
  };
 
  private authState= new BehaviorSubject(null);
  constructor( public navCtrl: NavController, private auth: AuthService, private storage: Storage,  private router:Router, public toastCtrl: ToastController, private postServ: PostService) { }

  ngOnInit() {

    
  }

 
  async signIn() {
    // validation done
    if(this.user.email==""){
      const toast = await this.toastCtrl.create({
        message: 'Dirección de correo no valida.',
        duration: 3000
      }); 
      toast.present();
    }else if(this.user.pw==""){
        const toast = await this.toastCtrl.create({
          message: 'Contraseña no valida.',
          duration: 3000
        });
        toast.present();
    }else{
      this.storage.set('session_storage', null);
      
      let body = {
        username: this.user.email,
        password: this.user.pw,
        accion: 'login'
      };

      this.postServ.postData(body, 'restserver/user_api').subscribe(async data =>{
        var role;
        var alertpesan = data['msg'];
        if(data['success']){
          this.authState.next(data);
          
          this.storage.set('session_storage', data['result']);
          
          for(let result of data['result']) { 
           
            role = result['rol_cod_cargo'];
           
           console.log('rol login ', role );    }
         
        if(role == '4'){
          this.router.navigateByUrl('/user-dashboard');
        const toast = await this.toastCtrl.create({
          message: 'Sesion Iniciada: Bienvenido.',
          duration: 2000
        });
        toast.present();
        }else if (role == '3'){
          this.router.navigateByUrl('/ruta');
          const toast = await this.toastCtrl.create({
            message: 'Sesion Iniciada: Bienvenido.',
            duration: 2000
          });
          toast.present();
          }
          
		 
        }else{
          const toast = await this.toastCtrl.create({
		    message: alertpesan,
		    duration: 2000
		    });
    	  toast.present();
        }
        this.user.email = "";
        this.user.pw = "";
        console.log(data);

      });


    }
   
  }


  loginUser(){
    this.auth.login(this.user.email, this.user.pw).then(success =>{ 
      if(success){
        this.navCtrl.navigateRoot('/ruta');
          
      }else{}
    });
  }

  formRegister(){
  	this.router.navigateByUrl('/register');
  }
}
