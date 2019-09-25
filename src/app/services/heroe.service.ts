import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HeroeModel } from "../models/heroe.model";
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HeroeService {
  private url = "https://crud-4ec95.firebaseio.com";

  constructor(private http: HttpClient) {}

  crear(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizar(heroe: HeroeModel) {
    const temp = {
      ...heroe
    };
    delete temp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, temp);
  }

  getListaHeroes() {
    return this.http.get(`${this.url}/heroes.json`).pipe(
      map(this.obternerListado),
      delay(1500)
    );
  }

  obternerListado(heroes: object) {
    const listado: HeroeModel[] = [];
    if (heroes === null) {
      return [];
    }

    Object.keys(heroes).forEach(key => {
      const heroe: HeroeModel = heroes[key];
      heroe.id = key;
      listado.push(heroe);
    });

    return listado;
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
