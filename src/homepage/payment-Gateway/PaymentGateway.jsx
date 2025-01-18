import  { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentGateway.css';

const PaymentGateway = () => {
    
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const query = new URLSearchParams(useLocation().search);
    const totalPrice = query.get('totalPrice');

    const handlePayment = () => {
        if (!cardNumber || !expiry || !cvv) {
            setErrorMessage('All fields are required!');
            return;
        }
        setErrorMessage('');
        alert('Payment processed successfully!');
        navigate('/successfull'); // Navigate to the Successfull page
    };

    return (
        <div className="payment-gateway-container">
            <h2>Payment Gateway</h2>
            <p>Total Amount: ${totalPrice}</p>
            <div className="form-group">
                <label>Card Number</label>
                <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Expiry Date</label>
                <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>CVV</label>
                <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={handlePayment} className="payment-button">Pay Now</button>
        </div>
    );
};

export default PaymentGateway;
