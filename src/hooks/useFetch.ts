import { useState } from "react";

export interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; 
    headers?: HeadersInit;
    body?: Record<string, unknown> | string; // Permitir string y JSON object
  }
  
  export const useFetch = <T,>() => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchData = async (url: string, options?: FetchOptions) => {
      setLoading(true);
      setError(null);
  
      const defaultOptions: FetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const mergedOptions = { ...defaultOptions, ...options };
  
      // Aseguramos que solo haya body si el método es POST o PUT
      if (mergedOptions.body && (mergedOptions.method === 'GET' || mergedOptions.method === 'DELETE')) {
        throw new Error('GET or DELETE requests should not have a body.');
      }
  
      // Si el body es un objeto, lo convertimos a string JSON
      if (mergedOptions.body && typeof mergedOptions.body !== 'string') {
        mergedOptions.body = JSON.stringify(mergedOptions.body);
      }
  
      try {
        const response = await fetch(url, mergedOptions as RequestInit);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        // setError((err as Error).message);
        throw new Error(`Error : ${ err }`);
      } finally {
        setLoading(false);
      }
    };
  
    return { data, loading, error, fetchData };
  };
  