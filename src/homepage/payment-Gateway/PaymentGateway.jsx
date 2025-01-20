import { useState } from 'react';
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

    // Helper function to format the card number with spaces
    const formatCardNumber = (value) => {
        // Remove non-digit characters
        const digitsOnly = value.replace(/\D/g, '');
        // Group digits into sets of 4
        return digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        setCardNumber(formatted);
    };

    const handlePayment = () => {
        // Validate the card number
        const cardNumberWithoutSpaces = cardNumber.replace(/\s/g, '');
        if (cardNumberWithoutSpaces.length !== 16) {
            setErrorMessage('Card number must be 16 digits!');
            return;
        }
        if (!expiry || !cvv) {
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
                    onChange={handleCardNumberChange}
                    maxLength={19} // Limit input to 19 characters (16 digits + 3 spaces)
                />
            </div>
            <div className="form-group">
                <label>Expiry Date</label>
                <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    maxLength={5}
                />
            </div>
            <div className="form-group">
                <label>CVV</label>
                <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={3} // Limit CVV to 3 digits
                />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={handlePayment} className="payment-button">Pay Now</button>
        </div>
    );
};

export default PaymentGateway;
