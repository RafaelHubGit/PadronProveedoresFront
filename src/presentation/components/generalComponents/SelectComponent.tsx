import { useState } from 'react';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';


export interface OptionSelect {
    value: string;  // Adjust according to your option structure
    label: string;
  }
  
  interface Props {
    autoFocus?: boolean; // Focus the control when it mounts
    className?: string; // Apply a className to the control
    classNamePrefix?: string; // Apply classNames to inner elements with the given prefix
    isDisabled?: boolean; // Disable the control
    isMulti?: boolean; // Allow the user to select multiple values
    isSearchable?: boolean; // Allow the user to search for matching options
    name?: string; // Generate an HTML input with this name, containing the current value
    onChange: (newValue: SingleValue<OptionSelect> | MultiValue<OptionSelect>) => void; // Subscribe to change events
    options: OptionSelect[]; // Specify the options the user can select from
    placeholder?: string; // Change the text displayed when no option is selected
    noOptionsMessage?: (obj: { inputValue: string }) => string | null; // Text to display when there are no options
    // value: SingleValue<OptionSelect> | MultiValue<OptionSelect>; // Controlled value
    title?: string;
  }
export const SelectComponent = ({ 
    autoFocus,
    className,
    classNamePrefix,
    isDisabled,
    isMulti,
    isSearchable,
    name,
    onChange,
    options,
    placeholder,
    noOptionsMessage,
    // value,
    title,
    ...props 
}: Props) => {

    const [selectedOption, setSelectedOption] = useState<SingleValue<OptionSelect> | MultiValue<OptionSelect> | null>(null);


    const handleChange = (selectedOption: SingleValue<OptionSelect> | MultiValue<OptionSelect> | null) => {
        setSelectedOption(selectedOption); // Actualiza el estado
        onChange(selectedOption); // Propaga el cambio
    };
      

  return (
    <div className='select-container mt-3'>
        <div className="text-wrap">
            <p>{title}</p>
        </div>
        <div className='select-wrap'>
            <Select
                autoFocus={autoFocus}
                className={className}
                classNamePrefix={classNamePrefix}
                isDisabled={isDisabled}
                isMulti={isMulti}
                isSearchable={isSearchable}
                name={name}
                onChange={handleChange}
                options={options}
                placeholder={placeholder}
                noOptionsMessage={noOptionsMessage}
                value={selectedOption}
                {...props}
            />
        </div>

        <div className="downText">
            {
                isMulti ? (
                    <div className="down-text-wrap">
                        <div>
                            {(selectedOption as MultiValue<OptionSelect>)?.map((option) => option.label).join(', ')}
                        </div>
                        <div>
                            Seleccionados: {(selectedOption as MultiValue<OptionSelect>)?.length}
                        </div>
                    </div>
                ) : ''
            }
        </div>
    </div>
  )
}
