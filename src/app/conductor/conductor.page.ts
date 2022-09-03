import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import{ RutasService } from '../services/rutas.service';
import { ToastController } from '@ionic/angular';
import { createNgModule } from '@angular/compiler/src/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stripSummaryForJitFileSuffix } from '@angular/compiler/src/aot/util';


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
infoWindows : any = []	;
 rutas: any[] = [];

	 // markers: Marker[] = [
		markers: any = [
	  {
	    position: {
	      lat: 4.502690,
	      lng:  -74.11115,
	    },
	    title: 'Parqueadero Taller King usme',
	    type: 'assets/markers/taller2.png'
	  },
	  {
	    position: {
	      lat: 4.505225,
	      lng: -74.113304,
	    },
	    title: 'Parqueadero Taller KING usme',
	    type: 'assets/markers/bike-parking.png'
	  },
	  {
	    position: {
	      lat: 4.579553,
	      lng:  -74.12565,
	    },
	    title: 'Parqueadero TALLER KING Rafael uribe',
	    type: 'assets/markers/bike-parking.png'
	  },
	  {
	    position: {
	      lat: 4.5796914,
	      lng:  -74.1184697,
	    },
	    title: 'Parqueadero TALLER KING Rafael uribe',
	    type: 'assets/markers/bike-parking.png'
	  },
	  {
	    position: {
	      lat: 4.5842319,
	      lng:  -74.1238369,
	    },
	    title: 'Parqueadero TALLER KING Rafael uribe',
	    type: 'assets/markers/bike-parking.png'
	  },
	  {
	    position: {
	      lat: 4.5928597,
	      lng:  -74.1149153,
	    },
	    title: 'Parqueadero TALLER KING Rafael uribe',
	    type: 'assets/markers/bike-parking.png'
	  },
	 

  
	  {
	    position: {
	      lat: 4.508056,
	      lng:  -74.1140039,
	    },
	    title: 'Taller Partes TALLER KING santafe',
	    type: 'assets/markers/bike-parking.png'
	  },
	  
	  {
	    position: {
	      lat: 4.5122983,
	      lng:  -74.1152795,
	    },
	    title: 'Taller Partes TALLER KING santafe',
	    type: 'assets/markers/bike-parking.png'
	  },
	  {
	    position: {
	      lat: 4.5041097,
	      lng:  -74.1004564,
	    },
	    title: 'Taller Partes TALLER KING santafe',
	    type: 'assets/markers/bike-parking.png'
	  },
	  {
	    position: {
	      lat: 4.5928597,
	      lng:  -74.1149153,
	    },
	    title: 'Parqueadero TALLER KING Rafael uribe',
	    type: 'assets/markers/bike-parking.png'
	  },
	  {
	    position: {
	      lat: 4.6065506,
	      lng:  -74.0815968,
	    },
	    title: 'Taller Partes TALLER KING santafe',
	    type: 'assets/markers/bike-parking.png'
	  },
	  {
	    position: {
	      lat: 4.6050335,
	      lng:  -74.0833013,
	    },
	    title: 'Taller Partes TALLER KING santafe',
	    type: 'assets/markers/bike-parking.png'
	  },
	  {
	    position: {
	      lat: 4.605511,
	      lng:  -74.082151,
	    },
	    title: 'Taller Partes TALLER KING santafe',
	    type: 'assets/markers/bike-parking.png'
	  },
	  {
	    position: {
	      lat: 4.6059488,
	      lng:  -74.0826235,
	    },
	    title: 'Taller Partes TALLER KING santafe',
	    type: 'assets/markers/bike-parking.png'
	  },	
	  {
	    position: {
	      lat: 4.585280,
	      lng: -74.077115,
	    },
	    title: 'Parqueadero TALLER KING Rafael uribe',
	    type: 'assets/markers/bike-parking.png'
	  },
	  {
	    position: {
	      lat: 4.608985,
	      lng: -74.084115,
	    },
	    title: 'Parqueadero TALLER KING',
	    type: 'assets/markers/taller.png'
	  },
	  {
	    position: {
	      lat: 4.611776,
	      lng: -74.074115,
	    },
	    title: 'Parqueadero TALLER KING',
	    type: 'assets/markers/bicyclep.png'
	  },
	  {
	    position: {
	      lat: 4.610803,
	      lng: -74.078428,
	    },
	    title: 'Parqueadero TALLER KING',
	    type: 'assets/markers/taller2.png'
	  },  {
	    position: {
	      lat: 4.619526,
	      lng: -74.071666,
	    },
	    title: 'Parqueadero TALLER KING',
	    type: 'assets/markers/bicyclep.png'
	  },
	  {
	    position: {
	      lat: 4.577260,
	      lng: -74.116610,
	    },
	    title: 'Parqueadero TALLER KING KING',
	    type: 'assets/markers/bike-parking.png'
	  },
	  {
	    position: {
	      lat: 4.486506,
	      lng: -74.097058,
	    },
	    title: 'PARQUEADERO TALLER KING',
	    type: 'assets/markers/taller.png'
	  }


	];

	movil: any;

	
  
  constructor(private geolocation: Geolocation, private toastCtrl: ToastController ,private storage: Storage, private router: Router, private RutasService: RutasService) { 

	//this.movil = setInterval(() => {
	//	console.log('hello there')
	//	this.obtenerCoordenadas()
	 //  }, 5000);

	   
this.obtenerRutas();

  }

  ngOnInit() {

  }

  ionViewDidEnter(){
	//this.getGeolocation();
	//this.startNavigating();	
	
  }



//refresher de la pagina
 /**  doRefresh(event) {
	console.log('Begin async operation');
	
	setTimeout(() => {
	location.reload();
	  console.log('Async operation has ended');
	  event.target.complete();
	}, 2000);
  }
  */
  public cambioRuta (event: any): void {
	this.storage.set('ruta_sel', null);
	console.log("valor:seelct->"+event.detail.value);
	localStorage.setItem('ruta_sel',event.detail.value)
	this.storage.set('ruta_sel',event.detail.value);
    console.log(JSON.stringify(event));
	console.log(JSON.stringify(event.detail.value));
	this.getGeolocation();
	this.obtenerPuntos();
	//this.obtenerCoordenadas();

		this.movil = setInterval(() => {
		console.log('hello there')
		this.obtenerCoordenadas()
	  }, 15000);

  }

  //usado para capturar la posicion
   getGeolocation(){
      	this.geolocation.getCurrentPosition().then((resp) => {
      	this.loadMap(resp);
       
      }).catch((error) => {
        console.log('Error getting location', error);
      });

     // let watch = this.geolocation.watchPosition();
     // watch.subscribe((data) => {
		//  console.log(data);
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude
     // });
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
	    //this.renderMarkers();
		this.addMarkerstoMap(this.markers);
		var icon = {
			url: "assets/markers/biket.png", // url
			scaledSize: new google.maps.Size(80, 80), // scaled size
			origin: new google.maps.Point(0,0), // origin
			anchor: new google.maps.Point(0, 0) // anchor
		};
	    const marker = {
	    	position: myLatLng,
	    	title: 'Aqui estas Tú',
	    	type: "assets/markers/biket64.png"
	    };
	    
		this.addInfoWindowToMarker(this.addMarker(marker));
	  });

	  this.marker_camion = new google.maps.Marker({
		position: {
			lat: 4.527881,
			lng: -74.120550,
		  },
		title: 'Hello World!',
		icon:'assets/markers/taller2.png'
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
	
	  console.log('!!obtenerPuntos ===',result);
	  //this.markers = result['datos'];
	  
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

	//renderMarkers() {
	//  this.markers.forEach(marker => {
	//    this.addMarker(marker);
	//  });
	//}
	addMarker(marker: Marker) {
	  return new google.maps.Marker({
	    position: marker.position,
	    map: this.map,
	    title: marker.title,
	    icon: marker.type
	  });
	}

	addMarkerstoMap(markers) {
		for(let marker of markers){

			//let position = new google.maps.LatLng(marker.position);
			let mapMarker =  new google.maps.Marker({
				position: marker.position,
				map: this.map,
				title: marker.title,
				icon: marker.type
			  });

			 mapMarker.setMap(this.map);
			 this.addInfoWindowToMarker(mapMarker);
			
		}
		
	  }

	  addInfoWindowToMarker(marker){
		  const infoWindowContent = `<div id="content"><h5 style="color: #000000">${marker.title}</h5><h3 style="color: #000000">Latitud, Longitud:${marker.position}</h3></div>`;
		 
		
		 let infowindow = new google.maps.InfoWindow({
			content: infoWindowContent,
			
		  });
		  
		  marker.addListener('click',()=>{
			this.closeAllInfoWindows();
			infowindow.open(this.map,marker);

		  });
		  this.infoWindows.push(infowindow)
		}
		closeAllInfoWindows(){
			for (let window of this.infoWindows){
				window.close();
			}
		}

}
