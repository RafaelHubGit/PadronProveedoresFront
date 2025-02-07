import { IGiroComercial } from "../interfaces/Catalogos.interface";


const baseUrl = `https://localhost:7015/api`;

export class CatalogosAPI {

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
