import { Component } from '@angular/core';
import { CocheService, cochesResponse } from '../../Services/coche.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  constructor(private cocheService: CocheService) { }

  coches!: cochesResponse[];
  cochesOriginales!: cochesResponse[]; 
  error: any;
  colores:  string[] | undefined;
  marcas:  string[] | undefined;
  filtroPrecio: number | undefined;
  filtroColor: string | undefined;
  filtroMarca: string | undefined;
  filtroAnio: number | undefined;
  filtroEstadoAlquiler: string | undefined;
  filtroPersonaAlquilada: string | undefined; 
  p: number = 1;

  ngOnInit() {
    this.lista();
  }

  lista() {
    this.error = '';
    this.cocheService.getCoches().subscribe({
      next: (res: any) => {
        console.log(res);
        this.coches = res;
        this.cochesOriginales = res; 
        this.colores = Array.from(new Set(this.coches.map(coche => coche.color)));
        this.marcas = Array.from(new Set(this.coches.map(coche => coche.marca)));
      },
      error: (err: any) => {
        console.log(err, 'error con el servidor');
        this.error = 'No hay buena conexión con el servidor';
      }
    });
  }


  filtro() {
    this.coches = this.cochesOriginales; 
    console.log("Coches filtrados según su ( " );

    if (this.filtroPrecio) {
      this.coches = this.coches.filter(coche => coche.precio_diario.toString().includes(this.filtroPrecio?.toString() || ''));
      console.log("| Precio = " +  this.filtroPrecio + " |");
    }
    if (this.filtroColor) {
      this.coches = this.coches.filter(coche => coche.color === this.filtroColor);
      console.log("| Color = " +  this.filtroColor + " |");
    }
    if (this.filtroMarca) {
      this.coches = this.coches.filter(coche => coche.marca === this.filtroMarca);
      console.log("| Marca = " +  this.filtroMarca + " |");
    }
    if (this.filtroAnio) {
      this.coches = this.coches.filter(coche => coche.anio.toString().includes(this.filtroAnio?.toString() || ''));
      console.log("| Año = " +  this.filtroAnio + " |");
    }
    if (this.filtroEstadoAlquiler) {
      this.coches = this.coches.filter(coche =>
        (this.filtroEstadoAlquiler === 'Disponible' && coche.alquiler.clienteNombre === null) ||
      (this.filtroEstadoAlquiler === 'Alquilado' && coche.alquiler.clienteNombre !== null)
    );
      console.log("| Estado = " +  this.filtroEstadoAlquiler + " |");
    }
    if (this.filtroPersonaAlquilada) {
      this.coches = this.coches.filter(coche => 
        coche.alquiler.clienteNombre && coche.alquiler.clienteNombre.includes(this.filtroPersonaAlquilada!)
      );
      console.log("| Persona que alquilo = " +  this.filtroPersonaAlquilada + " |");
    }
    const ids = this.coches.map(coche => coche.id);
    console.log(") id's: " + JSON.stringify(ids));
    //console.log("): " + JSON.stringify(this.coches,null , 2));
  }


  restablecer(){
    this.coches = this.cochesOriginales;
    this.filtroPrecio = undefined;
    this.filtroColor = undefined;
    this.filtroMarca = undefined;
    this.filtroAnio = undefined;
    this.filtroEstadoAlquiler = undefined;
    this.filtroPersonaAlquilada = undefined;
    console.log("Valores restablecidos");
  }


  eliminarCoche(cocheId: any) {
    if (confirm("¿Estás seguro de querer eliminarlo?")) {
      this.cocheService.deleteCoche(cocheId).subscribe({
        next: (res: any) => {
          this.lista();
          console.log(res, 'Eliminado');
          alert('Se ha eliminado correctamente');
        },
        error: (err: any) => {
          console.log(err, 'error con el servidor');
          alert('Error del servidor');
        }
      });
    }
  }
}
