import { Component } from '@angular/core';
import { CocheService, cochesResponse  } from '../../Services/coche.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
})
export class UpdateComponent {

  constructor(private route:ActivatedRoute, private cocheService: CocheService){}

cocheId:any;
coche!: any;
errors: any = [];
coches!: cochesResponse[];



//busqueda del id de la ruta con el del json
  ngOnInit(){
    this.cocheId = this.route.snapshot.paramMap.get('id');
    this.cocheService.getCoche(this.cocheId).subscribe(
      res => {
        console.log(res);
        this.coche = res; // Asignar el coche específico a this.coche
      
      },
      (error: any) => {
        console.error('Error al obtener coches:', error);
      }
    );
  }

  

//actualizacion
updateCoche() {
  //comprobacion falta de datos = a error
    this.errors = '';
    if (!this.coche.marca || !this.coche.modelo || !this.coche.anio || !this.coche.color || !this.coche.matricula || !this.coche.precio_diario
       || !this.coche.imagen || !this.coche.kilometraje) {
     
  console.error('Error al actualizar el coche: Faltan datos obligatorios');
        this.errors = 'Rellena todos los campos y a opcion el de notas';
        return;
    }

    //asignacion de valores
    var aptCoche = {
      marca: this.coche.marca,
      modelo: this.coche.modelo,
      anio: this.coche.anio, 
      color: this.coche.color, 
      matricula: this.coche.matricula, 
      precio_diario: this.coche.precio_diario, 
      imagen: this.coche.imagen,
      nota: this.coche.nota, 
      kilometraje: this.coche.kilometraje 
    };
   
    //Insercion al json
    this.cocheService.updateCoche(aptCoche,this.cocheId ).subscribe({
      next: (res:any) => {
        console.log(res, 'Coche actualizado')
        alert( 'Se ha actualizado correctamente')
      },
      error: (err:any) => {
        console.log(err, 'error con el servidor')
        alert( 'Error del servidor')
      }
    });
    
  }
}
