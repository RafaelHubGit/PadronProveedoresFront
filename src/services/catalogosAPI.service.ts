import { IGiroComercial } from "../interfaces/Catalogos.interface";


const baseUrl = `https://localhost:7015/api`;

export class CatalogosAPI {

  static crearApi = async ( giroComercial: IGiroComercial ) : Promise <IGiroComercial | null> => {
    try {

      const url = `${baseUrl}/CatGiroComercial`;

      const datos = giroComercial;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      
      // const data = await response.json();
      const data: IGiroComercial = await response.json();
      return data;

    } catch ( e ) {
      console.log('Error : ', e);
      return null;
    }

  }

  static actualizarApi = async ( giroComercial: IGiroComercial ) : Promise <IGiroComercial | null> => {
    try {

      if ( !giroComercial.idGiroComercial ){
        throw new Error(`Se debe proporcionar un id Valido`);
      }

      const url = `${baseUrl}/CatGiroComercial/${ giroComercial.idGiroComercial }`;

      const datos = giroComercial;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      
      // const data = await response.json();
      const data: IGiroComercial = await response.json();
      return data;

    } catch ( e ) {
      console.log('Error : ', e);
      return null;
    }

  }

  static eliminarFisicoApi = async (id: number): Promise<{ success: boolean, code?: number, message?: string }> => {
    try {
      if (!id) {
        throw new Error("Se debe proporcionar un ID válido.");
      }
  
      const url = `${baseUrl}/CatGiroComercial/${id}`;
  
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        return { success: true }; // Eliminación exitosa
      }
  
      // Manejar diferentes códigos de error
      if (response.status === 409) {
        return { success: false, code: 409, message: "No se puede eliminar el registro porque está referenciado por otros datos." };
      } else if (response.status === 404) {
        return { success: false, code: 404, message: "El registro no existe." };
      } else if (response.status === 500) {
        return { success: false, code: 500, message: "Error interno del servidor." };
      }
  
      // Si no se reconoció el error, devolver mensaje genérico
      return { success: false, message: `Error inesperado: ${response.statusText}` };
  
    } catch (e) {
      console.error("Error:", e);
      return { success: false, message: "Error al conectar con el servidor." };
    }
  };
  

  static eliminarLogicoApi = async (idGiroComercial: number, idUsuario: number): Promise<{ success: boolean, code?: number, message?: string }> => {
    try {
      if (!idGiroComercial) {
        throw new Error("Se debe proporcionar un ID válido.");
      }
  
      // const url = `${baseUrl}/CatGiroComercial/eliminarLogico`;
      const url = `${baseUrl}/CatGiroComercial/eliminarLogico?idGiroComercial=${idGiroComercial}&idUsuario=${idUsuario}`;


      // console.log("URL : ", url);
  
      // const datos = {
      //   idGiroComercial: idGiroComercial ,
      //   idUsuario: idUsuario,
      // };

      // console.log('los datos : ', datos);
  
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(datos),
      });
  
      if (response.ok) {
        return { success: true }; // Eliminación exitosa
      }
  
      // Si no se reconoció el error, devolver mensaje genérico
      return { success: false, message: `Error inesperado: ${response.statusText}` };
  
    } catch (e) {
      console.error("Error:", e);
      return { success: false, message: "Error al conectar con el servidor." };
    }
  };


  static getGirosComercialesApi = async (): Promise<IGiroComercial[] | null> => {
    try{
      const response = await fetch(`${baseUrl}/CatGiroComercial`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      
      // const data = await response.json();
      const data: IGiroComercial[] = await response.json();
      return data;
    } catch ( e ) {
      console.log(`ERROR ${ e }`);
      return null;
    } 
  }


}
