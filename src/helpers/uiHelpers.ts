import Swal from 'sweetalert2';

interface ToastOptions {
    titulo?: string;
    mensaje: string;
    icono?: 'success' | 'error' | 'warning' | 'info';
    duracion?: number;
    posicion?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'center' | 'center-start' | 'center-end';
}

interface AlertOptions {
    titulo: string;
    mensaje: string;
    icono?: 'success' | 'error' | 'warning' | 'info' | 'question';
    mostrarConfirmacion?: boolean;
    mostrarDenegacion?: boolean;
}

export const alert = ({ titulo, mensaje, icono = 'info', mostrarConfirmacion = true, mostrarDenegacion = false }: AlertOptions) => {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: icono,
      showCancelButton: mostrarDenegacion,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showConfirmButton: mostrarConfirmacion,
    });
};

export const toast = ({ titulo, mensaje, icono = 'success', duracion = 3500, posicion = 'top-end' }: ToastOptions) => {
Swal.fire({
    title: titulo,
    text: mensaje,
    icon: icono,
    timer: duracion,
    toast: true,
    position: posicion,
    showConfirmButton: false,
});
};