// import { useEffect, useState } from 'react';

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';

interface Props {
    titulo?: string;
    // setDate: (date: Date) => void;
    // disabled?: boolean;
    // initialValue?: Date;
}

// export const DateTimePickerComponent = ({ titulo = "", setDate, disabled = false, initialValue }: Props) => {
    export const DateTimePickerComponent = ({ titulo } : Props) => {
  // Usar initialValue como estado inicial
//   const [value, setValue] = useState( initialValue );

  // Efecto para comunicar cambios al componente padre
//   useEffect(() => {
//     setDate(value);
//   }, [value, setDate]);

//   useEffect(() => {
//     setValue( initialValue );
//   }, [initialValue])
  

//   const handleChange = (newValue) => {
//       setValue(newValue);
//   };

  return (
      <div className="date-picker-container">
        <div className='text'>
          <p> { titulo } </p>
        </div>
        <DateTimePicker 
              calendarAriaLabel="Toggle calendar"
            //   onChange={handleChange} 
              disableClock={true}
            //   disabled={disabled}
              format="dd/MM/yyyy"
              clearIcon={null}
              calendarIcon={<i className="material-icons">calendar_month</i>}
              className="my-custom-date-picker"
            //   value={value} 
        />
      </div>
  );
};
