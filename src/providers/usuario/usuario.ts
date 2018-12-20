import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

@Injectable()

export class UsuarioProvider {

  clave:string;
  user:any = {};
  docDb:Subscription;

  constructor ( public db: AngularFirestore,
                private platform:Platform,
                private storage:Storage  ) {

  }

  verificationUser(clave:string){
    clave = clave.toLocaleLowerCase();// todo lo pasa en minuscula 
    return new Promise ((resolve, reject) =>{
      this.docDb = this.db.doc(`/usuarios/${ clave }`)
      .valueChanges().subscribe( data =>{
        if(data) {
          this.clave = clave;
          this.user = data;
          this.guardarstorage();
          resolve(true);
        } else {
          resolve(false);
        }       
      })
    })
  }

  guardarstorage(){
    if (this.platform.is('cordova') ){
      //celular
      this.storage.set('clave', this.clave);

    } else {
      localStorage.setItem('clave', this.clave);
    }
  }

  cargarStorage(){
    return new Promise ((resolve, reject) => {
      if (this.platform.is('cordova') ){
        //celular
        this.storage.get('clave').then( val => {
          if (val) {
            this.clave = val;
            resolve(true);
          } else {
            resolve(false)
          }
        })
        this.storage.set('clave', this.clave);
  
      } else {
        if(localStorage.getItem('clave')){
          this.clave = localStorage.getItem('clave');
          resolve(true);
        } else {
          resolve(false);
        }
        
      }
    })
  }
  
  deleteUser(){
    this.clave = null;
    if (this.platform.is('cordova')) {
      this.storage.remove('clave');
    } else {
      localStorage.removeItem('clave');
    }
    
    this.docDb.unsubscribe();
  }
}
