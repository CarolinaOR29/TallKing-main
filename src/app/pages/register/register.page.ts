import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  password: string = "";
  confirm_password: string = "";
  mail: string = "";

  ciclas :any = [
      {
        tipo :'RUTA'
      },
      {
        tipo:'BMX'
      },
      {
        tipo:'Infantil'
      },
      {
        tipo:'Clasica'
      },
      {
        tipo:'MTB'
      },
      {
        tipo:'TODO TERRENO'
      },
      {
        tipo:'URBANAS'
      }

  ];
  constructor(
    private router: Router,
  	private postServ: PostService,
  	public toastCtrl: ToastController
  ) { }
  
  ngOnInit() {
  }

  async userRegister(){
    // validation done
    if(this.username==""){
        const toast = await this.toastCtrl.create({
          message: 'Nombre de usuario es obligatorio.',
          duration: 3000
        });
        toast.present();
    }else if(this.password==""){
        const toast = await this.toastCtrl.create({
          message: 'Contraseña tiene que contener almenos 6 caracteres entre numeros y letras',
          duration: 3000
        });
        toast.present();
    } else if(this.mail==""){
      const toast = await this.toastCtrl.create({
        message: 'Nombre de usuario es obligatorio.',
        duration: 3000
      });
      toast.present();
  }else if(this.password.length < 5){
      const toast = await this.toastCtrl.create({
        message: 'Contraseña tiene que contener almenos 6 caracteres entre numeros y letras',
        duration: 3000
      });
      toast.present();
  }
    else if(this.password!=this.confirm_password){
        const toast = await this.toastCtrl.create({
          message: 'Contraseñas no coinciden',
          duration: 3000
        });
        toast.present();
    }else{

      let body = {
        username: this.username,
        password: this.password,
        accion: 'register'
      };

      this.postServ.postData(body, 'restserver/user_api').subscribe(async data =>{
        var alertpesan = data['msg'];
        if(data['success']){
          this.router.navigate(['/login']);
          const toast = await this.toastCtrl.create({
            message: 'Registro exitoso, ya puede Ingresar',
            duration: 6000
          });
          toast.present();
        }else{
          const toast = await this.toastCtrl.create({
            message: alertpesan+'error servicios',
            duration: 3000
          });
          toast.present();
        }
      });

    }
  
  }

  formLogin(){
  	this.router.navigate(['/login']);
  }

}
