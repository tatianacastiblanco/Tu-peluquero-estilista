
// import { Injectable } from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { UsuarioProvider } from '../usuario/usuario';


// @Injectable()
// export class UbicacionProvider {

//   estilista: AngularFirestoreDocument<any>;
  

//   constructor ( public db: AngularFirestore,
//                 private geolocation:Geolocation,
//                 public _usuarioProv:UsuarioProvider,
//   ) {
//    // this.estilista = db.doc( `/usuarios/ ${ _usuarioProv.clave }`);

//     this.estilista = db.collection('usuarios').doc(`${ _usuarioProv.clave }`)
//   }
  
//   initGeolocation(){
       
//     this.geolocation.getCurrentPosition().then((resp) => {
//       // resp.coords.latitude
//       // resp.coords.longitude
//       this.estilista.update({
//         lat: resp.coords.latitude,
//         long: resp.coords.longitude,
//         clave: this._usuarioProv.clave 
//       });

//       console.log(resp.coords);

//       let watch = this.geolocation.watchPosition();
//       watch.subscribe((data) => {
//         this.estilista.update({
//           lat: data.coords.latitude,
//           long: data.coords.longitude,
//           clave: this._usuarioProv.clave 
//         });         
//       });
      
//      }).catch((error) => {
//        console.log('Error getting location', error);
//      });
//   }
// }
