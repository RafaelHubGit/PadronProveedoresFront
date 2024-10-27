import { ChangeEvent, useState } from 'react';

/**
 * Custom hook to manage form state.
 *
 * @param {Object} initialForm - Initial state of the form.
 * @returns {Object} - Contains form state, onInputChange handler, and onResetForm handler.
 *
 * @example
 * // In a functional component:
 * import { useForm } from './path/to/hooks';
 *
 * const initialForm = { name: '', email: '' };
 *
 * const MyFormComponent = () => {
 *   const { formState, onInputChange, onResetForm } = useForm(initialForm);
 *
 *   return (
 *     <form>
 *       <div>
 *         <label>Name:</label>
 *         <input
 *           type="text"
 *           name="name"
 *           value={formState.name}
 *           onChange={onInputChange}
 *         />
 *       </div>
 *       <div>
 *         <label>Email:</label>
 *         <input
 *           type="email"
 *           name="email"
 *           value={formState.email}
 *           onChange={onInputChange}
 *         />
 *       </div>
 *       <button type="button" onClick={onResetForm}>Reset</button>
 *     </form>
 *   );
 * };
 */

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    setFormState, // Añadir esto para poder usar setFormState externamente
  };
};
