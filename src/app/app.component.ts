import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: '/user-dashboard',
      icon: 'home'
    },
    {
      title: 'Talleres',
      url: '/servicios',
      icon: 'construct'
    },
    {
      title: 'TIPS',
      url: '/tips',
      icon: 'construct'
    },
    {
      title: 'HURTO y PERDIDA',
      url: '/seguridad',
      icon: 'construct'
    },
    {
      title: 'Parqueaderos',
      url: '/tutoriales',
      icon: 'bicycle'
    },
    {
      title: 'Preguntas',
      url: '/preguntas',
      icon: 'megaphone'
    },
    {
      title: 'Tiendas & Servicios MAPA',
      url: '/ciclista',
      icon: 'map'
    },
   
  ];
  public labels = [ 'Unirse', 'Servicios', 'Consultas', 'Recompensas','Califiquenos', 'Siguenos en redes!'];
  public sociales = ['Facebook','Twitter','Youtube'];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
