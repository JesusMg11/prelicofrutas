import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private datos: DatosService) { }

  frutas:any;
  frutaNombre:any;
  frutaObtenida:any;
  fruta = {name:"", family:"", genus:"", id:"", nutritions:{calories:"", carbohydrates:"", fat:"", protein:"", sugar:"" }, order:""};
  familias = [];
  arregloFamilias = [];
  genus = [];
  arregloGenus = [];
  order = [];
  arregloOrder = [];

  filtroABuscar = {filtro:"", opcion:""};
  
  banderaFamilia = false;
  banderaGenus = false;
  banderaOrder = false;

  filtros = [
    { id: 'family', filtro: 'Family' },
    { id: 'genus', filtro: 'Genus' },
    { id: 'order', filtro: 'Order' },
  ];

  obtenerFrutas(){
    this.datos.getAllFruits().subscribe(respuesta=>{
      this.frutas = respuesta;
      for (let item of this.frutas) {
        this.familias.push(item["family"]);
        this.genus.push(item["genus"]);
        this.order.push(item["order"]);
      }      
      this.arregloFamilias = Array.from(new Set(this.familias));
      this.arregloGenus = Array.from(new Set(this.genus));
      this.arregloOrder = Array.from(new Set(this.order));
    },error=>{
      console.log("ERROR: "+error);
    });
  }

  verInformacion(item){
    this.frutaNombre = item.name;
    this.obtenerInformacionFruta();
  }

  obtenerInformacionFruta(){
    this.datos.getFruitFacts(this.frutaNombre).subscribe(respuesta=>{
      this.frutaObtenida = respuesta;
      this.fruta = this.frutaObtenida;
    },error=>{
      console.log("ERROR: "+error);
    });
  }

  filtro(e){
   if(e == "order"){
     this.banderaFamilia = false;   
     this.banderaGenus = false;
     this.banderaOrder = true;
   }else if(e == "genus"){
    this.banderaFamilia = false;
    this.banderaGenus = true;
    this.banderaOrder = false;
   }else{
    this.banderaFamilia = true;
    this.banderaGenus = false;
    this.banderaOrder = false;
   }
  }

  obtenerFamilias(){
    this.filtroABuscar.opcion =  $('#selectFamilia').val();
    this.filtroABuscar.filtro = "family";
    this.buscarPorFiltro();
  }
  
  obtenerGenus(){
    this.filtroABuscar.opcion =  $('#selectGenus').val();
    this.filtroABuscar.filtro = "genus";
    this.buscarPorFiltro();
  }

  obtenerOrder(){
    this.filtroABuscar.opcion =  $('#selectOrder').val();
    this.filtroABuscar.filtro = "order";
    this.buscarPorFiltro();
  }

  buscarPorFiltro(){
    this.datos.getFruitByFilter(this.filtroABuscar).subscribe(respuesta=>{
      this.frutas = respuesta;
      for (let item of this.frutas) {
        this.familias.push(item["family"]);
        this.genus.push(item["genus"]);
        this.order.push(item["order"]);
      }      
      this.arregloFamilias = Array.from(new Set(this.familias));
      this.arregloGenus = Array.from(new Set(this.genus));
      this.arregloOrder = Array.from(new Set(this.order));
    },error=>{
      console.log(error);
    });
  }
  ngOnInit(): void {
    this.obtenerFrutas();
  }

}
