// const baseUrl = `https://localhost:7015/api`;
const baseUrl = import.meta.env.VITE_BACK_API_URL;

console.log("EL URL : ", baseUrl);

export class CatalogosAPI<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  private async handleResponse(response: Response) {

    console.log("RTEPONSE EN EL HANDLE : ", response);

    // ✅ Si el servidor devuelve 204 No Content, lo manejamos aquí
    if (response.status === 204) {
      return { success: true }; 
    }

    if (response.ok) return { success: true, data: await response.json() };

    const errorMessages: Record<number, string> = {
      404: "El registro no existe.",
      409: "No se puede eliminar el registro porque está referenciado por otros datos.",
      500: "Error interno del servidor.",
    };

    return {
      success: false,
      code: response.status,
      message: errorMessages[response.status] || `Error inesperado: ${response.statusText}`,
    };
  }

  async getAll(): Promise<T[] | null> {
    try {
      const response = await fetch(`${baseUrl}/${this.endpoint}`);
      const result = await this.handleResponse(response);
      return result.success ? result.data : null;
    } catch (e) {
      console.error("Error:", e);
      return null;
    }
  }

  async create<T>(data: T): Promise<T | null> {
    try {
      console.log("LA DATA : ", data);
      const response = await fetch(`${baseUrl}/${this.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log("EL REPONSE API : ", response);
      const result = await this.handleResponse(response);
      return result.success ? result.data : null;
    } catch (e) {
      console.error("Error:", e);
      return null;
    }
  }

  async update<T>(id: number, data: Partial<T>): Promise<T | null> {
    try {
      const response = await fetch(`${baseUrl}/${this.endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await this.handleResponse(response);
      console.log("REPONSE API ; ", result);
      return result.success ? result.data : null;
    } catch (e) {
      console.error("Error:", e);
      return null;
    }
  }

  async delete(id: number): Promise<{ success: boolean; code?: number; message?: string }> {
    try {
      const response = await fetch(`${baseUrl}/${this.endpoint}/${id}`, {
        method: "DELETE",
      });
      return await this.handleResponse(response);
    } catch (e) {
      console.error("Error:", e);
      return { success: false, message: "Error al conectar con el servidor." };
    }
  }

  //Eliminacion logica
  async softDelete(
    idParam: string, 
    id: number, 
    userParam: string, 
    userId: number
  ): Promise<{ success: boolean; code?: number; message?: string }> {
    try {
      const response = await fetch(
        `${baseUrl}/${this.endpoint}/eliminarLogico?${idParam}=${id}&${userParam}=${userId}`,
        { method: "PATCH" }
      );

      console.log("REPONSE PATCH : ", response);

      return await this.handleResponse(response);
    } catch (e) {
      console.error("Error:", e);
      return { success: false, message: "Error al conectar con el servidor." };
    }
  }
  
}
