import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ListodoService } from '../../services/listodo.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  /* @ViewChild( IonList) lista : IonList; */
  @Input( ) terminada = true;

  constructor(public listodoService: ListodoService,
              private router: Router,
              private alertCtrl: AlertController) {
   }

  ngOnInit() {}

  listaSeleccionada(lista: Lista){
    if(this.terminada){
      this.router.navigateByUrl(`tabs/tab2/add/${ lista.id }`);
    }else{
      this.router.navigateByUrl(`tabs/tab1/add/${ lista.id }`);
    }
  }

  borrarLista(lista:Lista){
    this.listodoService.borrarLista(lista);
  }

  async editarLista(lista:Lista){
    const alert = await this.alertCtrl.create({
      header: 'Edit List',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
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
         text:'Update',
         handler: (data) => {
           console.log(data);
           if (data.titulo.length === 0){
             return;
           }

           lista.titulo = data.titulo;
           this.listodoService.guardarStorage();
           /* this.lista.closeSlidingItems(); */

         }
        }
      ]
    });

    alert.present();
  }
}
