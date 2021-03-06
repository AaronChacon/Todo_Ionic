import { Component, OnInit } from '@angular/core';
import { ListodoService } from '../../services/listodo.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  lista:Lista;
  nombreItem: string = '';

  constructor( private listodoService : ListodoService,
                private route: ActivatedRoute ) {

      const listaId = this.route.snapshot.paramMap.get('listaId')
      
      this.lista = this.listodoService.obtenerLista(listaId);

      
   }

  ngOnInit() {
  }

  agregarItem(){
    if (this.nombreItem.length === 0){
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.listodoService.guardarStorage();
  }

  cambioCheck(item: ListaItem){
    
    const pendientes = this.lista.items
          .filter(itemData => !itemData.completado )
          .length;
          
          if(pendientes === 0){
            this.lista.terminadaEn = new Date();
            this.lista.terminada = true;
          }else{
            this.lista.terminadaEn = null;
            this.lista.terminada = false;
          }
          
    this.listodoService.guardarStorage();
    console.log(this.listodoService.listas);
  }

  borrar(i: number){
    this.lista.items.splice(i,1);
    this.listodoService.guardarStorage();
  }
  

}
