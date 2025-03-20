import { Component } from '@angular/core';
import { CocheService} from '../../Services/coche.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html'
})
export class DevolucionComponent {

  constructor(private route:ActivatedRoute, private cocheService: CocheService, private router: Router){}

  cocheId:any;
  coche!: any;
  errors: any = [];
  diasTotal: number = 0;
  fechaFinal: Date = new Date(); 
  
    

//busqueda del id de la ruta con el del json
  ngOnInit(){  
      this.cocheId = this.route.snapshot.paramMap.get('id'); 
      
      this.cocheService.getCoche(this.cocheId).subscribe(
        res => {
          console.log(res);
          this.coche = res; // Asignar el coche específico a this.coche
         this.comprobacion(); // Llamar a comprobacion después de asignar this.coche
        },
        (error: any) => {
          console.error('Error al obtener el coche:', error);
         if (error.status === 404) {
          alert('No se encuentra este coche');
          this.router.navigate(['/']);
        } 
        //alert ('Error '+ error.status)
        }
      );
    }
  
   
  //Comprobacion de si ya esta devuelto te redirija a la pagina principal
  comprobacion() {
  
    if (
      this.coche.alquiler.clienteNombre == null &&
      this.coche.alquiler.fechaInicio == null
    ) {
      alert('Este coche ya fue devuelto, fuera');
      this.router.navigate(['/']);
    } else {
      // Calcular los días transcurridos
      const fechaInicio = new Date(this.coche.alquiler.fechaInicio);
      const fechaFinal = new Date(this.fechaFinal);
      const diferencia = fechaFinal.getTime() - fechaInicio.getTime();
      const unDia = 86400000; //milisegundos
      this.diasTotal = Math.ceil((diferencia + unDia) / unDia); // añadimos unDia para que se tenga en cuenta el total de dias 
    }
  }
  
  diaActual(): string {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  } 
  

//Devolucion
  devolucionCoche() {
   
    //asignacion de valores
    var devCoche = {
        alquiler:{
          clienteNombre: null,
          fechaInicio: null
      }
    };
     

    //Insercion al json
      this.cocheService.updateCoche(devCoche,this.cocheId ).subscribe({
        next: (res:any) => {
          console.log(res, 'Coche devuelto')
          alert( 'Se ha devuelto correctamente')
          this.router.navigate(['/']); //redirijido a la pag.principal
        },
        error: (err:any) => {
          console.log(err, 'error con el servidor')
          alert( 'Error del servidor')
        }
      }); 
      
    
  }
}
