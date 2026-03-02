import React from 'react';

const CheckoutTab = () => {
    return (
        <div className="tab-container">
            <div className="tab-header">
                <h1>Checkout</h1>
                <p>Review your bill</p>
            </div>

            <div className="card">
                <h3>Bill Summary</h3>
                <div style={{ marginTop: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Room Charge (2 Nights)</span>
                        <span>$400.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Room Service</span>
                        <span>$45.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Spa Details</span>
                        <span>$120.00</span>
                    </div>
                    <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <span>Total</span>
                        <span>$565.00</span>
                    </div>
                </div>
            </div>

            <button style={{ width: '100%', padding: '15px', background: '#bf953f', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold' }}>
                Proceed to Checkout
            </button>
        </div>
    );
};

export default CheckoutTab;
