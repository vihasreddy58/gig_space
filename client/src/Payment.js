import React, { useState } from 'react';
import './tran1.css';

// Define all the form components
const CreditCardForm = () => (
    <div className="form-container-gig">
        <form>
            <h2>Credit Card</h2>
            <div>
                <b>Total:</b>
                <br />
                <p id="amt">dho sou rupayi</p>
                <br />
            </div>
            <label htmlFor="credit_card_no">Your card Number</label>
            <input type="text" id="ccn" name="credit_card_no" placeholder="1234-1234-1234-1234" required />
            <label htmlFor="cvc">CVC</label>
            <input type="text" id="cvv" name="cvc" placeholder="1234" required />
            <label>Exp Month & Year</label>
            <span className="expiration-gig">
                <input type="text" name="month" placeholder="MM" maxLength="2" size="2" />
                <input type="text" name="year" placeholder="YY" maxLength="2" size="2" />
            </span>
            <button type="submit">Submit</button>
        </form>
    </div>
);

const NetBankingForm = () => (
    <div className="form-container-gig">
        <form>
            <h2>Net Banking Details</h2>
            <label htmlFor="banks">Bank</label>
            <input list="banks" />
            <datalist id="banks">
                <option value="SBI" />
                <option value="BOB" />
                <option value="AXIS BANK" />
                <option value="ICIC" />
                <option value="Andhra Bank" />
            </datalist>
            <label htmlFor="bk_nm">Banking Id</label>
            <input type="text" id="bk_nm" name="bk_nm" required />
            <label htmlFor="net_ps">Password</label>
            <input type="password" id="net_ps" name="net_ps" required />
            <button type="submit">Submit</button>
        </form>
    </div>
);

const UpiTransactionForm = () => (
    <div className="form-container-gig">
        <form>
            <h2>UPI Transaction</h2>
            <label className="radio-label-gig">
                <input type="radio" name="option" value="1" />
                <img src="image1.png" alt="Option 1" />
                <span className="checkmark-gig"></span>
            </label>
            <label className="radio-label-gig">
                <input type="radio" name="option" value="2" />
                <img src="image2.png" alt="Option 2" />
                <span className="checkmark-gig"></span>
            </label>
            <label className="radio-label-gig">
                <input type="radio" name="option" value="3" />
                <img src="image3.png" alt="Option 3" />
                <span className="checkmark-gig"></span>
            </label>
            <label htmlFor="upi_id">Enter UPI ID</label>
            <input type="text" id="upi_id" name="upi_id" placeholder="number@paytm" required />
            <button type="submit">Submit</button>
        </form>
    </div>
);

const DebitCardForm = () => (
    <div className="form-container-gig">
        <form>
            <h2>Debit Card</h2>
            <div>
                <b>Total:</b>
                <br />
                <p id="amt">dho sou rupayi</p>
                <br />
            </div>
            <label htmlFor="dedit_card_no">Your card Number</label>
            <input type="text" id="dcn" name="dedit_card_no" placeholder="1234-1234-1234-1234" required />
            <label htmlFor="dedit_cvv">CVC</label>
            <input type="text" id="cvv" name="cvc" placeholder="1234" required />
            <label>Exp Month & Year</label>
            <span className="expiration-gig">
                <input type="text" name="month" placeholder="MM" maxLength="2" size="2" />
                <input type="text" name="year" placeholder="YY" maxLength="2" size="2" />
            </span>
            <button type="submit">Submit</button>
        </form>
    </div>
);

const Payment = () => {
    const [activeContent, setActiveContent] = useState('content1');

    const showContent = (contentId) => {
        setActiveContent(contentId);
    };

    return (
        <div className="payment-wrapper"> {/* Wrapper div for centering */}
            <div className="container-gig">
                <div className="left-panel-gig">
                    <div className="block-gig" onClick={() => showContent('content1')}>Debit Card</div>
                    <div className="block-gig" onClick={() => showContent('content2')}>Net Banking</div>
                    <div className="block-gig" onClick={() => showContent('content3')}>UPI Transaction</div>
                    <div className="block-gig" onClick={() => showContent('content4')}>Credit Card</div>
                </div>

                <div className="right-panel-gig">
                    {activeContent === 'content1' && <DebitCardForm />}
                    {activeContent === 'content2' && <NetBankingForm />}
                    {activeContent === 'content3' && <UpiTransactionForm />}
                    {activeContent === 'content4' && <CreditCardForm />}
                </div>
            </div>
        </div>
    );
};

export default Payment;
