import { useState } from "react";
import { createCustomer, finishOrder } from "./api";
import { useNavigate } from "react-router-dom";
import validator from 'validator';
const MyForm = ({ orderId, onSubmit, onUpdateOrder }) => {
    const [emailError, setEmailError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', address: ''
    })
    const validateEmail = (e) => {
        var email = e.target.value
        if (validator.isEmail(email)) {
            setEmailError('')
        }
        else {
            setEmailError('Please enter a valid email')
        }
    }
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        const orderIdCopy = orderId;
        event.preventDefault();
        const firstName = formData.firstName;
        const lastName = formData.lastName;
        const email = formData.email;
        const address = formData.address;
        const customer = await createCustomer(firstName, lastName, email, address);
        const finishedOrder = await finishOrder(customer, orderId);
        onUpdateOrder();
        onSubmit();
        navigate('/confirmation', { state: { email, orderIdCopy } });
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };


    return (
        <div className="myform">
            <p>To complete the order please enter your data.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange}
                    onBlur={(e) => validateEmail(e)} />
                <p className="email-error">{emailError}</p>
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} />
                <br />
                <button type="submit">Finish</button>
            </form>
        </div>
    );
}

export default MyForm;

