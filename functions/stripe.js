const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret_key);

admin.initializeApp();

exports.createStripeInvoice = functions.https.onCall(async (data, context) => {
    // Ensure the user is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }

    try {
        // Create a new customer or use an existing one
        const customer = await stripe.customers.create({
            email: data.email, // Customer's email
            name: data.memberName, // Customer's name
            // Add other customer details if necessary
        });

        // Create an invoice item
        await stripe.invoiceItems.create({
            customer: customer.id,
            amount: data.totalCost, // Amount in cents
            currency: 'usd',
            description: `Private Party on ${data.dateOfEvent} - ${data.eventName}`,
        });

        // Create the invoice
        const invoice = await stripe.invoices.create({
            customer: customer.id,
            collection_method: 'send_invoice',
            days_until_due: 30, // Set due days for the invoice
        });

        // Finalize and send the invoice to the customer's email
        await stripe.invoices.finalizeInvoice(invoice.id);
        await stripe.invoices.sendInvoice(invoice.id);

        return { success: true, message: 'Invoice created and sent successfully.' };
    } catch (error) {
        console.error('Stripe error:', error);
        throw new functions.https.HttpsError('internal', 'Unable to create and send invoice.');
    }
});
