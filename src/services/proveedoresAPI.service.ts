


export class ProveedoresAPI {

  static getTypeSenseData = async (searchTerm: string, pageNumber: number, pageSize: number): Promise<unknown> => {
    const response = await fetch(`https://localhost:7015/api/TypeSense?searchTerm=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }
}
