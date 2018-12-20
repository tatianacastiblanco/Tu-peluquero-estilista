import { Component, COMPILER_OPTIONS } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as maboxgl  from 'mapbox-gl';
//import * as MapboxDirections from '@mapbox/mapbox-gl-directions';
  
import { pointerCoord } from 'ionic-angular/util/dom';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Subscription } from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  estado: boolean = false;
  estilista: AngularFirestoreDocument<any>;
  endWhatch: Subscription;
  map:any;
  userTs:any;
  screenMap:any;
  tmp:any = false;
  constructor ( public navCtrl: NavController,
                //public _ubicacionProvi: UbicacionProvider ,
                public db: AngularFirestore,
                private geolocation:Geolocation,
                public _usuarioProv:UsuarioProvider
              ) {
    //this._ubicacionProvi.initGeolocation();
    this.estilista = db.collection('usuarios').doc(`${ _usuarioProv.clave }`) 
    this.geolocation.getCurrentPosition();     
  }

  ionViewWillEnter() {
    this.inicializarMp(this.estado);
  } 

  connectDb(estado) {
    this.estado == true ? this.tmp = true:this.tmp=false;
    this.tmp == true ?false:true;

    this.geolocation.watchPosition()
    .subscribe ((data) => {
      
      if(!this.tmp) {
         console.log(this.tmp);
            
        this.estilista.update({          
          lat: data.coords.latitude,
          long: data.coords.longitude,
          estado: this.estado,
          clave: this._usuarioProv.clave           
        });   
        this.screenMap.jumpTo({
          center:[data.coords.longitude, data.coords.latitude],
          zoom:15,          
        });
           
      } else if(this.tmp) { 
        console.log(this.tmp);
        
        this.estilista.update({ 
          estado: this.estado,
          clave: this._usuarioProv.clave           
        }); 

        this.screenMap.jumpTo({
          center:[data.coords.longitude, data.coords.latitude],
          zoom:15,          
        }) 
      }
       
     // console.log(estado);
      
    }); 
  }

  inicializarMp(estado):Observable<any> {
    this.map = maboxgl;
    this.map.accessToken = 'pk.eyJ1IjoibGVpZHktdCIsImEiOiJjanAyeWdjOHgwMGRvM3dwaDdzNGJhMmZ4In0.2_xAbtdqiB4c-Wa0Qf1Vgw';
     
    this.screenMap =  new maboxgl.Map({
      container:'mapBox',
      style:'mapbox://styles/mapbox/streets-v9'           
    })

    this.screenMap.addControl( new maboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy:true,         
      },
      trackUserLocation:true      
    }))
  
  console.log(estado);
      
    return estado;
  }

// cerrar sesion
  SignOff() {
    // this.availability();
    this.navCtrl.setRoot(LoginPage)
    this._usuarioProv.deleteUser();
  }
}