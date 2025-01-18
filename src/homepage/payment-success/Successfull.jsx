import  { useState, useEffect } from 'react';
import './Successfull.css';

const Successfull = () => {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(true);
        }, 500); // Show confetti after 500ms
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="success-container">
            {showConfetti && <div className="confetti"></div>}
            <div className="success-content">
                <div className="success-icon">
                    <div className="checkmark"></div>
                </div>
                <h1>Payment Successful!</h1>
                <p>Thank you for your purchase. Your transaction has been completed.</p>
                <button className="return-button" onClick={() => (window.location.href = '/')}>
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default Successfull;
