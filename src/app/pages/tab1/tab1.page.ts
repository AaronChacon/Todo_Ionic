import { Component } from '@angular/core';
import { ListodoService } from '../../services/listodo.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public listodoService:ListodoService,
              private router: Router,
              private alertCtrl: AlertController ) {
  }

  async addList(){
  /*   this.router.navigateByUrl('tabs/tab1/add');
  } */
    const alert = await this.alertCtrl.create({
      header: 'New list',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'List name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: ()=>{
            console.log('Cancel');
            
          }
        },
        {
         text:'Add',
         handler: (data) => {
           console.log(data);
           if (data.titulo.length === 0){
             return;
           }

           const listaId = this.listodoService.crearLista(data.titulo);

           this.router.navigateByUrl(`tabs/tab1/add/${ listaId }`);

         }
        }
      ]
    });

    alert.present();
  }
}
