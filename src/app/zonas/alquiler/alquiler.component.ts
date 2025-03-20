import { Component } from '@angular/core';
import { CocheService, cochesResponse  } from '../../Services/coche.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html'
})
export class AlquilerComponent {

constructor(private route:ActivatedRoute, private cocheService: CocheService, private router: Router){}
 
cocheId:any;
coche!: any;
errors: any = [];

  ngOnInit(){
    this.cocheId = this.route.snapshot.paramMap.get('id');
    this.cocheService.getCoche(this.cocheId).subscribe(
      res => {
        console.log(res);
        this.coche = res; 
       this.comprobacion(); // Llamar a comprobacion después de asignar this.coche
      },
      (error: any) => {
        console.error('Error al obtener el coche:', error);
         if (error.status === 404) {
          alert('No se encuentra este coche');
          this.router.navigate(['/']);
        } 
       // alert ('Error '+ error.status)
      }
    );
  } 

  
  //Comprobacion de si ya esta alquilado te redirija a la pagina principal
  comprobacion(){
    if( this.coche.alquiler.clienteNombre != null &&  this.coche.alquiler.clienteNombre != null){
      alert( 'Este coche esta alquilado, fuera')
      this.router.navigate(['/']); 
     }
    }


diaActual(): string {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const dia = fecha.getDate().toString().padStart(2, '0');
  return `${año}-${mes}-${dia}`;
} 

//alquiler
alquilerCoche() {
  //comprobacion falta de datos = a error
     this.errors = '';
    if (!this.coche.alquiler.clienteNombre || !this.coche.alquiler.fechaInicio ) {
    console.error('Error al alquilar el coche: Faltan datos necesarios');

        this.errors = 'Ambos campos son necesarios';
        return;
    }

    //asignacion de valores
    var alqCoche = {
      alquiler:{
      clienteNombre: this.coche.alquiler.clienteNombre,
      fechaInicio: this.coche.alquiler.fechaInicio
    }
    };
   
    //Insercion al json
    this.cocheService.updateCoche(alqCoche,this.cocheId ).subscribe({
      next: (res:any) => {
        console.log(res, 'Alquilado')
        alert( 'Se ha alquilado correctamente')
        this.router.navigate(['/']); //redirijido a la pag.principal
      },
      error: (err:any) => {
        console.log(err, 'error con el servidor')
        alert( 'Error del servidor')
      }
    });
      
  } 
}
