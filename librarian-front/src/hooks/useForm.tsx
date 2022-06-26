import {useState} from 'react';

const useForm:any = (initialState = {}) => {

    const [formState, setFormState] = useState(initialState);

    const reset = () => {
        setFormState(initialState);
    }

    const handlerInput = ({target}:any) => {
        setFormState({
          ...formState,
          [target.name]: target.value
        });
    }
  

    return ([
        formState,
        handlerInput,
        reset
    ]);
}

export default useForm