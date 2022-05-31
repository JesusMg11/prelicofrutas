import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

/*URL PARA PRODUCCIÓN 
const URL:string = "https://www.fruityvice.com/api/fruit/";
*/
//URL PARA LA API FRUITS LOCAL
/* La URL https://www.fruityvice.com se encuentra dentro del archivo proxy.conf.json para evitar las CORS en el ambiente local
  ng serve --proxy-config proxy.conf.json
*/
const URL:string = "/api/fruit/";

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }

  getAllFruits(){
    return this.http.get(URL + "all");
  }

  getFruitFacts(name){
    return this.http.get(URL + name);
  }

  getFruitByFilter(filter){
    return this.http.get(URL + filter.filtro + "/" + filter.opcion);
  }
}
