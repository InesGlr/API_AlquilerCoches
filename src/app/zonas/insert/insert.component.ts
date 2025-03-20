import { Component } from '@angular/core';
import { CocheService } from '../../Services/coche.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css'
})
export class InsertComponent {

  constructor(private cocheService:CocheService, private router: Router){}


  marca: string = '';
  modelo: string = '';
  anio: number = 0;
  color: string = '';
  matricula: string = '';
  precio_diario: number = 0;
  imagen: string = '';
  nota: string = '';
  kilometraje: string = '';
errors: any = [];

    

//insercion de un nuevoo coche
  insertCoche() {
  //comprobacion falta de datos = a error
    this.errors = '';
    if (!this.marca || !this.modelo || !this.anio || !this.color || !this.matricula || !this.precio_diario
       || !this.imagen || !this.kilometraje) {
    
  console.error('Error al guardar el coche: Faltan datos obligatorios'); 
  this.errors = 'Rellena todos los campos y a opcion el de notas';
        return;
    }

    this.marca = this.marca.charAt(0).toUpperCase() + this.marca.slice(1).toLowerCase();
    this.modelo = this.modelo.charAt(0).toUpperCase() + this.modelo.slice(1).toLowerCase();
    this.color = this.color.charAt(0).toUpperCase() + this.color.slice(1).toLowerCase();

    //asignacion de valores
    var nuevoCoche = {
      marca: this.marca,
      modelo: this.modelo,
      anio: this.anio, 
      color: this.color, 
      matricula: this.matricula, 
      precio_diario: this.precio_diario, 
      alquiler:  {
        clienteNombre: null,
        fechaInicio: null
      }, 
      imagen: this.imagen,
      nota: this.nota, 
      kilometraje: this.kilometraje 
    };

    
   
    //Insercion al json
    this.cocheService.saveCoche(nuevoCoche).subscribe({
      next: (res:any) => {
        console.log(res, 'respuesta del servidor')
        alert( 'Se ha añadido correctamente')
        this.router.navigate(['/']); //redirijido a la pag.principal
      },
      error: (err:any) => {
        console.log(err, ' error con el servidor')
        alert( 'Error del servidor')
      }
    });
    
  }
}
