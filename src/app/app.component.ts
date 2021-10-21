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
      title: 'Servicios',
      url: '/servicios',
      icon: 'leaf'
    },
    {
      title: 'Manualidades',
      url: '/tutoriales',
      icon: 'heart'
    },
    {
      title: 'Denuncia',
      url: '/denuncia',
      icon: 'megaphone'
    },
    {
      title: 'Ruta Recoleccion',
      url: '/conductor',
      icon: 'map'
    },
    {
      title: 'vista conductor',
      url: '/ruta',
      icon: 'map'
    }
  ];
  public labels = ['Siguenos en nuestras redes!', 'Aportar', 'Servicio Social', 'Transmilenio', 'Recompensas','Califiquenos'];
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
