import { Proveedor } from "../interfaces/Proveedor.interface";


const baseUrl = `https://localhost:7015/api`;

export class ProveedoresAPI {

  static getTypeSenseData = async (searchTerm: string, pageNumber: number, pageSize: number): Promise<unknown> => {
    try{
      const response = await fetch(`${baseUrl}/TypeSense?searchTerm=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`);

      
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch ( e ) {
      console.log(`ERROR ${ e }`);
    } 
  }

  static getProveedorByNumeroProveedor = async ( numeroProvedor: string ): Promise<Proveedor | unknown> => {
    try{
      const response = await fetch(`${baseUrl}/Proveedor/ByNumeroProveedor/${numeroProvedor}`);
      
      if( !response ) {
        throw new Error(`No se encontró el proveedor con número ${numeroProvedor}`);
      }
  
      const data = await response.json();
      return data[0];
    } catch ( e ) {
      console.log(`ERROR ${ e }`);
    } 
  }


}
