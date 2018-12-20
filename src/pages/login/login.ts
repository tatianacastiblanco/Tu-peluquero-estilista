import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Button, LoadingController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;

  constructor (  public navCtrl: NavController,
                 public alertCtrl: AlertController,
                 public loadingctrl:LoadingController,
                 public _usuarioProvider:UsuarioProvider
              ) {
  }

  ionViewDidLoad() {
   this.slides.paginationType ='bullets';
   this.slides.lockSwipes(true);
   this.slides.freeMode = false;
  }

  mostrarInput(){
    this.alertCtrl.create({
      title:'Ingrese',
      inputs:[{
        name:'Usuario',
        placeholder: 'Usuario'
      }],
      buttons:[{
        text:'cancelar',
        role:'cancel' 
      },{
      text:'Ingresar',
        handler: data => {
          //console.log(data);
          this.VerificarUsuaraio( data.Usuario )
        }
      }]
    }).present();
  }
  
  VerificarUsuaraio(clave: string) {
    let loading = this.loadingctrl.create({
      content: 'Verificando Usuario'
    });
    //console.log(clave);
    loading.present();

    this._usuarioProvider.verificationUser( clave)
    .then( existe =>{
      loading.dismiss();

      if (existe) {
        this.slides.lockSwipes(false);
        this.slides.freeMode = true;
        this.slides.slideNext()
        this.slides.lockSwipes(true);
        this.slides.freeMode = false;
      } else {
        this.alertCtrl.create({
          title: 'Intente de nuevo',
          subTitle: 'Usuario incorrecto',
          buttons:['Ok']
        }).present();
      }
    })

  }

  ingresar(){
    this.navCtrl.setRoot(HomePage);
  }

}
