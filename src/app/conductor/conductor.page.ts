import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import{ RutasService } from '../services/rutas.service';
import { ToastController } from '@ionic/angular';
import { createNgModule } from '@angular/compiler/src/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';


declare var google, icons;

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
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {
 //@ViewChild('map') mapElement: ElementRef;

 map: any;
 marker_camion: any;
	
 rutas: any[] = [];

	  markers: Marker[] = [
	  {
	    position: {
	      lat: 4.658383846282959,
	      lng: -74.09394073486328,
	    },
	    title: 'Parque Simón Bolivar',
	    type: 'assets/markers/container30x30.png'
	  }
	];

	movil: any;

	
  
  constructor(private geolocation: Geolocation, private toastCtrl: ToastController ,private storage: Storage, private router: Router, private RutasService: RutasService) { 

	this.movil = setInterval(() => {
		console.log('hello there')
		this.obtenerCoordenadas()
	   }, 5000);

	   
this.obtenerRutas();

  }

  ngOnInit() {

  }

  ionViewDidEnter(){
	//this.getGeolocation();
	//this.startNavigating();	
	
  }



//refresher de la pagina
  doRefresh(event) {
	console.log('Begin async operation');
	
	setTimeout(() => {
	location.reload();
	  console.log('Async operation has ended');
	  event.target.complete();
	}, 2000);
  }

  public cambioRuta (event: any): void {
	this.storage.set('ruta_sel', null);
	console.log("valor:seelct->"+event.detail.value);
	localStorage.setItem('ruta_sel',event.detail.value)
	this.storage.set('ruta_sel',event.detail.value);
    console.log(JSON.stringify(event));
	console.log(JSON.stringify(event.detail.value));
	this.getGeolocation();
	this.obtenerPuntos();
	this.obtenerCoordenadas();

  }

  //usado para capturar la posicion
   getGeolocation(){
      	this.geolocation.getCurrentPosition().then((resp) => {
      	this.loadMap(resp);
       
      }).catch((error) => {
        console.log('Error getting location', error);
      });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
		//  console.log(data);
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude
      });
    } 

  loadMap(position: Geoposition) {
  	

  		let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
       // console.log(latitude, longitude);

	  // create a new map by passing HTMLElement
	  const mapEle: HTMLElement = document.getElementById('map');
	  // create LatLng object
	 
	  const myLatLng = {lat: latitude ,lng: longitude};
	  // create map
	  this.map = new google.maps.Map(mapEle, {
	    center: myLatLng,
		zoom: 14,
		zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: false
	  });

	  directionsDisplay.setMap(this.map);
	  
		

	  google.maps.event.addListenerOnce(this.map, 'idle', () => {
	    
	    mapEle.classList.add('show-map');
	    this.renderMarkers();
	    const marker = {
	    	position: myLatLng,
	    	title: 'Tu',
	    	type: 'assets/markers/fem60.png'
	    };
	    this.addMarker(marker);
	  });

	  this.marker_camion = new google.maps.Marker({
		position: {
			lat: 4.658383846282959,
			lng: -74.09394073486328,
		  },
		title: 'Hello World!',
		icon:'assets/markers/truck.png'
	  });
  
	  /*var marker = {
		position: myLatLng,
		title: 'Tu',
		type: 'assets/markers/truck.png'
	  };*/
	  //this.addMarker(marker);
	  this.marker_camion.setMap(this.map)


	}

	startNavigating(){

		directionsService.route({
			
		 origin: {lat: 4.739585, lng: -74.094547},
		 destination: {lat: 4.7369, lng: -74.096802},
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
	 
	let body = { };
	
	
	console.log('obtener rutas',body);
	
	return this.RutasService.postData(body, 'restserver/obtenerRutas').subscribe(async result =>{
		
		  console.log('obtener rutas',result);
		  
		  this.rutas = result['datos'];
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
	  
	  this.storage.get('ruta_sel').then(data=>{
		
		sel_ruta = data;
		
		console.log('stor_ruta', sel_ruta);
		
		
	
		let body = {      
			ruta: localStorage.getItem('ruta_sel')
		};
	
	
	console.log('obtenerPuntos',body);
	
	return this.RutasService.postData(body, 'restserver/obtenerParadasRuta').subscribe(async result =>{
	
	  console.log('obtenerPuntos',result);
		  
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



	  async obtenerCoordenadas(){
		var sel_ruta;		
		this.storage.get('ruta_sel').then(data=>{		  
		  sel_ruta = data;		  
		  console.log('stor_ruta', sel_ruta);
		  
	  
		  let body = {      
			ruta: localStorage.getItem('ruta_sel')
		  };
	  
	  
	  console.log('obtenerCoordenadas',body);
	 
	  return this.RutasService.postData(body, 'restserver/obtenerCoordenadas').subscribe(async result =>{
		var latC, lngC ;
		console.log('obtenerCoordenadas2',result);

		for(let geo of result['datos']) { 
           
            latC = geo['latitud'];
			lngC = geo['longitud'];
		   console.log('rol login ', latC ); 
		   console.log('rol login ', lngC );     }
		//console.log( result.datos[0].latitud)

		
		this.marker_camion.setPosition( {
			lat: parseFloat(latC),
			lng: parseFloat(lngC)
		  } );
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
