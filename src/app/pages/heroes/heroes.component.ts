import { Component, OnInit } from "@angular/core";
import { HeroeService } from "../../services/heroe.service";
import { HeroeModel } from "../../models/heroe.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargado = false;

  constructor(private heroeService: HeroeService) {
    this.cargado = true;
    this.consultar();
  }

  consultar() {
    this.heroeService.getListaHeroes().subscribe(
      resp => {
        this.heroes = resp;
        this.cargado = false;
      },
      err => {
        this.cargado = false;
        Swal.fire({
          title: "Error Consultando listado heroes",
          type: "error"
        });
      }
    );
  }

  borrar(id: string, i: number) {
    Swal.fire({
      title: "¿Esta seguro?",
      type: "question",
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heroeService.borrarHeroe(id).subscribe(
          reponse => {
            this.heroes.splice(i, 1);
          },
          err => {
            console.log("Error borarndo heroes");
          }
        );
      }
    });
  }

  ngOnInit() {}
}
