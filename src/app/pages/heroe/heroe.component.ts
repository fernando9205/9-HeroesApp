import { Component, OnInit } from "@angular/core";
import { HeroeModel } from "../../models/heroe.model";
import { NgForm } from "@angular/forms";
import { HeroeService } from "../../services/heroe.service";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styleUrls: ["./heroe.component.css"]
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();

  constructor(
    private heroeService: HeroeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("Id");

    if (id !== "nuevo") {
      this.heroeService.getHeroe(id).subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log("Formulario no valido");
      return;
    }

    Swal.fire({
      title: "Guardando...",
      type: "info",
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    if (this.heroe.id) {
      peticion = this.heroeService.actualizar(this.heroe);
    } else {
      peticion = this.heroeService.crear(this.heroe);
    }

    peticion.subscribe(
      resp => {
        Swal.fire({
          title: this.heroe.nombre,
          text: "Se actualizo correctamente",
          type: "success"
        });
      },
      err => {
        Swal.fire({
          title: this.heroe.nombre,
          text: "No se ha podido actualizar",
          type: "error"
        });
      }
    );
  }
}
