import { useState } from 'react'
import validateInfo from './validateInfo';

const useForm = () => {
    const [values, setValues] = useState({
        cardName: '',
        cardNumber: '',
        cardType: '',
        expirationMonth: '',
        expirationYear: '',
        cardSecurityCode: '',
        focus: ''
    })

    const [errors, setErrors] = useState({})

    const handleFocus = (e) => {
        setValues({ 
            ...values,
            focus: (e.target.name === 'cardSecurityCode') ? 'cvc' : e.target.name
        });
    }

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
      console.log(e, "oi")
      console.log(values, "oi")
      
        e.preventDefault()
        setErrors(validateInfo(values))
    };
    
    return { handleChange, handleFocus, handleSubmit, values, errors };
};

export default useForm; 