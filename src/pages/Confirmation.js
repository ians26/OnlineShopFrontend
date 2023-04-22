import { useLocation } from "react-router-dom";
const Confirmation = () => {
    const location = useLocation();
    const { email, orderIdCopy } = location.state;
    return (
        <div className="confirmation">
            <p>Your order#{orderIdCopy} has been successfully created</p>
            <p>A confirmation email has been sent to {email}</p>
        </div>
    );
}

export default Confirmation;