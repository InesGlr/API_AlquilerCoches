import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//exportamos los valores del json
export interface cochesResponse {
      "id": any,
      "marca": string,
      "modelo": string,
      "anio": number,
      "color": string,
      "matricula": string,
      "precio_diario": number,
      "alquiler": {
        "clienteNombre": string,
        "fechaInicio": Date
      },
      "imagen": string,
      "nota": string,
      "kilometraje": number
}

export interface cochesUpdateResponse {
  coche:cochesResponse 
}

@Injectable({
  providedIn: 'root'
})

export class CocheService {

  constructor(private http: HttpClient) {}

//busqueda de un coche
getCoches(){ 
  return this.http.get(`http://localhost:3000/coches`);
}

//busqueda de un coche
  getCoche(cocheId:any){ 
    return this.http.get<cochesUpdateResponse>(`http://localhost:3000/coches/${cocheId}`);
  }

//insercion de un nuevo coche
  saveCoche(inputData: object ){ 
    return this.http.post(`http://localhost:3000/coches`, inputData);
  }

  //actualizacion de un coche
  updateCoche(inputData: object, cocheId:any ){ 
    return this.http.patch(`http://localhost:3000/coches/${cocheId}`, inputData);
  }
  
  //eliminacion de un coche
  deleteCoche(cocheId:any){ 
    return this.http.delete(`http://localhost:3000/coches/${cocheId}`);
  }
}
