import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NavController,ToastController } from '@ionic/angular';
import{ RutasService } from '../services/rutas.service';
import { PostService } from 'src/app/services/post.service';
import { Storage } from '@ionic/storage';

declare var google;
var miruta;
 
interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
  type: string;
}
let directionsService = new google.maps.DirectionsService();
let directionsDisplay = new google.maps.DirectionsRenderer();


@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss'],
})
export class RutaPage implements OnInit {

    //@ViewChild('map') mapElement: ElementRef;
    @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;
  contador: 0;
  
  hoja_ruta_s : 0;
  markers: Marker[]
  servicios: any[] = [
    {
      "cod_servicio": "1",
      "nombre_servicio": "Talleres Cicla"
  },
  {
      "cod_servicio": "4",
      "nombre_servicio": "Talleres Moto "
  },
  {
      "cod_servicio": "14",
      "nombre_servicio": "Parqueaderos"
  },
  {
      "cod_servicio": "16",
      "nombre_servicio": "Monta Llantas"
  },
  {
      "cod_servicio": "17",
      "nombre_servicio": "Tiendas Verdes"
  }
  ];
  




  constructor( public toastCtrl: ToastController,private storage: Storage,private postServ: PostService,private RutasService: RutasService,private geolocation: Geolocation, public navCtrl: NavController, private router: Router) {

    
     // this.getGeolocation();
      //this.startNavigating();
    this.obtenerRutas();
    
   }

  ngOnInit() {
    
  }

  ionViewDidEnter(){}



doRefresh(event) {
  console.log('Begin async operation');
  
  setTimeout(() => {
    location.reload();
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}


public cambioHojaRuta (event: any): void {
  

  this.hoja_ruta_s = 0;
  this.storage.set('hoja_ruta_sel', null);
  
  miruta = setTimeout(() => {
    
    this.storage.set('hoja_ruta_sel',event.detail.value);
    this.hoja_ruta_s = event.detail.value;
   
      console.log(JSON.stringify(event));
    console.log(JSON.stringify(event.detail.value));
    
    this.obtenerPuntos();
    this.getGeolocation();
    
    
  }, 2000);
 
  
  }

getGeolocation(){
  
    this.geolocation.getCurrentPosition().then((resp) => {
    this.loadMap(resp);
    
  }).catch((error) => {
    console.log('Error obteniendo ubicacion', error);
  });


}
 

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
   console.log('loadmap',latitude, longitude);
    //let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    const mapEle: HTMLElement = document.getElementById('map');
   
    // create LatLng object
    const myLatLng = {lat: latitude ,lng: longitude};
  

	  this.map = new google.maps.Map(mapEle, {
      zoom: 14,
      center: myLatLng,
      mapTypeId: 'terrain'
  
    });

    
   
  directionsDisplay.setMap(this.map);
  directionsDisplay.setPanel(this.directionsPanel.nativeElement);
    
  google.maps.event.addListenerOnce(this.map, 'idle', () => {
      
    var icon = {
      url: "assets/markers/biketi.png", // url
      scaledSize: new google.maps.Size(80, 80), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };

    var marker = new google.maps.Marker({
      position: myLatLng,
      title: 'Cicla',
      icon:'assets/markers/biketi.png'
    });

    /*var marker = {
      position: myLatLng,
      title: 'Tu',
      type: 'assets/markers/truck.png'
    };*/
    //this.addMarker(marker);
    marker.setMap(this.map)
    this.renderMarkers();
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     console.log("watching",data);   
      
      const myLatLng = {lat: data.coords.latitude   ,lng: data.coords.longitude};
      
      //this.enviarCoordenadas(data.coords.latitude,data.coords.longitude);
      marker.setPosition( myLatLng );
       //console.log(marker)
      });
      

    mapEle.classList.add('show-map');
 
    
  });

}

async enviarCoordenadas(latitud, longitud){
  var sel_ruta;
  
  this.storage.get('hoja_ruta_sel').then(data=>{
    
    sel_ruta = data;
    
    console.log('stor_ruta', sel_ruta);
    console.log('var_ruta', this.hoja_ruta_s);
    

    let body = {
      latitud: latitud,
      longitud: longitud,
      id_ruta: sel_ruta
    };


console.log(body);

return this.RutasService.postData(body, 'restserver/user_api').subscribe(async result =>{

      
            if(result['success']){
                if(result['status']== "200"){

                  const toast = await this.toastCtrl.create({
                    message: 'Posicion Almacenada.',
                    duration: 2000
                  });
                  toast.present();
                }else{
                  const toast = await this.toastCtrl.create({
                message: 'Localizando..',
                duration: 2000
                });
                toast.present();
              }
            }else{
              const toast = await this.toastCtrl.create({
            message: 'error',
            duration: 2000
            });
            toast.present();
            }

        
    });
     });
  }

startNavigating(){

   directionsService.route({
    origin: {lat: 4.7164787, lng: -74.0735291},
    destination: {lat: 4.7334884, lng: -74.0781407},
    provideRouteAlternatives: false,
    travelMode: 'DRIVING'  
    
  }, (res, status) => {

      if(status == google.maps.DirectionsStatus.OK){
          directionsDisplay.setDirections(res);
      } else {
          console.warn(status);
      }

  });

}

async obtenerRutas(){
 
    let body = {      
      
    };


console.log(body);

return this.RutasService.postData(body, 'restserver/obtenerRutas').subscribe(async result =>{

      console.log(result);
    if(result['status'] == 200){
        if(result['mensaje'] == "ok"){

          const toast = await this.toastCtrl.create({
            message: 'Posicion Almacenada.',
            duration: 2000
          });
          toast.present();
        }else{
          const toast = await this.toastCtrl.create({
        message: 'Localizando..',
        duration: 2000
        });
        toast.present();
      }
    }else{
      const toast = await this.toastCtrl.create({
    message: 'error',
    duration: 2000
    });
    toast.present();
    }


    });
     
  }

async obtenerPuntos(){
  var sel_ruta;
  
  this.storage.get('hoja_ruta_sel').then(data=>{
    
    sel_ruta = data;
    
    console.log('stor_ruta', sel_ruta);
    console.log('var_ruta', this.hoja_ruta_s);
    

    let body = {      
      id_ruta: this.hoja_ruta_s
    };


console.log(body);

return this.RutasService.postData(body, 'restserver/obtenerParadasRuta').subscribe(async result =>{

  console.log(result);
  this.markers = result['datos'];
    if(result['status'] == 200){
        if(result['mensaje'] == "ok"){

          const toast = await this.toastCtrl.create({
            message: 'Posicion Almacenada.',
            duration: 2000
          });
          toast.present();
        }else{
          const toast = await this.toastCtrl.create({
        message: 'Localizando..',
        duration: 2000
        });
        toast.present();
      }
    }else{
      const toast = await this.toastCtrl.create({
    message: 'error',
    duration: 2000
    });
    toast.present();
    }


    });
     });
  }

renderMarkers() {
  this.markers.forEach(marker => {
    console.log(marker);
    this.addMarker(marker);
  });
}
addMarker(marker: Marker) {
  return new google.maps.Marker({
    position: marker.position,
    map: this.map,
    title: marker.title,
    icon: marker.type
  });
}

}


