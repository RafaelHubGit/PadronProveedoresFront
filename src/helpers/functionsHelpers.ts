

const calcularRangoRegistros = (numPagina: number, registrosPorPagina: number, totalRegistros: number) => {
    const inicio = (numPagina - 1) * registrosPorPagina + 1;
    const calculoFin = inicio + ( registrosPorPagina - 1 );
    const  fin = (calculoFin > totalRegistros) ? calculoFin : totalRegistros;
    return { inicio, fin };
}

const calculaPagina = ( numeroElemento: number, sizePage: number) => {
    const page = Math.ceil( (numeroElemento ) / sizePage ) //se pone numeroElemento + 1 ya que se puso la referencia cada sizepage y para que haga el calculo del 
    return page === 0 ? 1 : page;
}


  
  
  export { calcularRangoRegistros, calculaPagina }