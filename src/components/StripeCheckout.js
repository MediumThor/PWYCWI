// stripe.button.component.jsx
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 10;
    const publishableKey = 'pk_test_51MkuD1JgS0v7QVUN3D82T7aXqRrBjczL3fzYB5CPyqcekgvwFG507W1s5st02BDeaqpNhDh3axwkNKJPPmKlRTtd00RjfM7ULx';
    const purchasePrice = 10;


    const onToken = token => {
        console.log(token);
        alert('Payment Succesful!');
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='Full Circle Compost'
            billingAddress
            shippingAddress
            image=''
            description={`Your total is $${purchasePrice}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;