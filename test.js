const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; // Change this to your desired port number

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Connected to the live server...");

const version = 'v18.0';
const phoneNumberId = '255286924341589';
// const userAccessToken = 'EAAFtZCeuJop0BOzwOGgIPjxYU7voc2S95chZAZBOgcBOLnvcTAG2KDd2SgKLu63tRZBt1ZAXCMNhQ5Jfen1hSPpK58r4FRgmmHKWSJL1svaUB3ObkdGCAuBlf8m1Y6fePZBNsxSyBeJALjk1UfiVvzZAGRaTyn6NwwFVa6deAG0omIvZC4QKmWIv6sYQhjtIOUrgwZBUTS41Woth3aXZCb5mQZD';
// For 919586743774
const userAccessToken = 'EAAFtZCeuJop0BO5C3XZB1caGI9O3rARTpmLBLLIPiu0STZBglZBt9g5H1ZAocw4sJiWwUYJEsouSKTumGHAscqzLrkt2dCRnBgBNn6lQhXFEnPzvh7zpvZCbah0dMZAaJc7st8Wbf6NfwYYSPGoWQvvQcKRMl0JQoikQZAqvvx4B1TZCNBAUCDkf9FUPV10A0XEOBuYoCqUZBAfe1iwUYMGggZD'; 

const baseUrl = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

// Append access token as a query parameter
const urlWithAccessToken = `${baseUrl}?access_token=${userAccessToken}`;

// Route handler for sending a custom message
app.post('/send-custom-message', async (req, res) => {

    const { recipientPhoneNumber, name, orderId, amtPaid, pendingBalance, byName } = req.body;
    try 
    {
        const result = await fn_sendCustomMessage(recipientPhoneNumber, name, orderId, amtPaid, pendingBalance, byName);

        // Function to send a custom message
        async function fn_sendCustomMessage(recipientPhoneNumber, name, orderId, amtPaid, pendingBalance, byName) {
            const text =`Hi ${name}! Thanks for your order! Order ${orderId} is confirmed. Total amount paid is ${amtPaid}. Pending balance ${pendingBalance} We also sent copy of your confirmation via email. Regards, ${byName}`;
            const body = {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: recipientPhoneNumber,
                type: 'text',
                text: {
                    preview_url: false,
                    body: text
                }
            };

            try 
            {
                const response = await axios.post(urlWithAccessToken, body);
                console.log('Custom message sent successfully:', response.data);
                return response.data;
            } 
            catch (error) 
            {
                console.error('Error sending custom message:', error.response ? error.response.data : error.message);
                throw error;
            }
        }

        res.json(result);
    } 
    catch (error) 
    {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error sending custom message' });
    }
});

// Route handler for sending a quotation
app.post('/send-quotation', async (req, res) => {
    const { recipientPhoneNumber, productName, price, validityPeriod, sellerName, quotationId, quotationNumber } = req.body;

    // Function to send a quotation
    async function fn_sendQuotation(recipientPhoneNumber, productName, price, validityPeriod, sellerName, quotationId, quotationNumber) 
    {
        const text = `Hello! Here is the quotation ${quotationNumber} (${quotationId}) for ${productName}:
Product: ${productName}
Price: ${price}
Validity Period: ${validityPeriod}
Seller: ${sellerName}
If you have any questions, feel free to contact us. Regards, ${sellerName}`;

        const body = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'text',
            text: {
                preview_url: false,
                body: text
            }
        };

        try 
        {
            const response = await axios.post(urlWithAccessToken, body);
            console.log('Quotation sent successfully:', response.data);
            return response.data;
        } 
        catch (error)
        {
            console.error('Error sending quotation:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    try 
    {
        const result = await fn_sendQuotation(recipientPhoneNumber, productName, price, validityPeriod, sellerName, quotationId, quotationNumber);
        res.json(result);
    } 
    catch (error) 
    {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error sending quotation' });
    }
});

// Route handler for sending an invoice
app.post('/send-invoice', async (req, res) => {
    const { recipientPhoneNumber, invoiceNumber, invoiceDate, dueDate, productName, price, quantity, sellerName } = req.body;

    // Function to send an invoice
    async function fn_sendInvoice(recipientPhoneNumber, invoiceNumber, invoiceDate, dueDate, productName, price, quantity, sellerName) 
    {
        const totalPrice = price * quantity;

        const text = `Hello! Here is your invoice ${invoiceNumber} for the purchase of ${productName}:
Invoice Number: ${invoiceNumber}
Invoice Date: ${invoiceDate}
Due Date: ${dueDate}
Product: ${productName}
Unit Price: $${price}
Quantity: ${quantity}
Total Price: $${totalPrice}
Seller: ${sellerName}
If you have any questions, feel free to contact us. Regards, ${sellerName}`;

        const body = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'text',
            text: {
                preview_url: false,
                body: text
            }
        };

        try 
        {
            const response = await axios.post(urlWithAccessToken, body);
            console.log('Invoice sent successfully:', response.data);
            return response.data;
        } 
        catch (error) 
        {
            console.error('Error sending invoice:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
    try 
    {
        const result = await fn_sendInvoice(recipientPhoneNumber, invoiceNumber, invoiceDate, dueDate, productName, price, quantity, sellerName);
        res.json(result);
    } 
    catch (error) 
    {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error sending invoice' });
    }
});

// Route handler for sending a location
app.post('/send-location', async (req, res) => {

    const { recipientPhoneNumber, longitude, latitude, name, address } = req.body;

    const body = {
        messaging_product: 'whatsapp',
        to: recipientPhoneNumber,
        type: 'location',
        location: {
            longitude: longitude,
            latitude: latitude,
            name: name,
            address: address
        }
    };

    try 
    {
        const response = await axios.post(urlWithAccessToken, body);
        console.log('Location sent successfully:', response.data);
        res.json({ message: 'Location sent successfully!' });
    } 
    catch (error) 
    {
        console.error('Error sending location:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error sending location' });
    }
});

// Route handler for sending a contact
app.post('/send-contact', async (req, res) => {
    const { recipientPhoneNumber, contactData } = req.body;
    // Function to send a contact
    async function fn_sendContact(recipientPhoneNumber, contactData) 
    {
        const body = {
            messaging_product: 'whatsapp',
            to: recipientPhoneNumber,
            type: 'contacts',
            contacts: [contactData]
        };

        try 
        {
            const response = await axios.post(urlWithAccessToken, body);
            console.log('Contact sent successfully:', response.data);
            return response.data;
        } 
        catch (error) 
        {
            console.error('Error sending contact:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    try
    {
        const result = await fn_sendContact(recipientPhoneNumber, contactData);
        res.json(result);
    } 
    catch (error) 
    {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error sending contact' });
    }
});

// Route handler for sending media (document)
app.post('/send-media', async (req, res) => {
    const { recipientPhoneNumber, filename, link } = req.body;

        // Function to send media (document)
    async function fn_sendMedia(recipientPhoneNumber, filename, link) {
        const body = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'document',
            document: {
                filename: filename,
                link: link
            }
        };

        try 
        {
            const response = await axios.post(urlWithAccessToken, body);
            console.log('Media sent successfully:', response.data);
            return response.data;
        } 
        catch (error) 
        {
            console.error('Error sending media:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
    try 
    {
        const result = await fn_sendMedia(recipientPhoneNumber, filename, link);
        res.json(result);
    } 
    catch (error) 
    {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error sending media' });
    }
});

// Route handler for sending media (video)
app.post('/send-video', async (req, res) => {
    const { recipientPhoneNumber, videoLink, caption } = req.body;

    // Function to send media (video)
    async function sendVideo(recipientPhoneNumber, videoLink, caption) 
    {
        const body = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'video',
            video: {
                link: videoLink,
                caption: caption || ''
            }
        };

        try 
        {
            const response = await axios.post(urlWithAccessToken, body);
            console.log('Video sent successfully:', response.data);
            return response.data;
        } 
        catch (error) 
        {
            console.error('Error sending video:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
    try 
    {
        const result = await sendVideo(recipientPhoneNumber, videoLink, caption);
        res.json(result);
    } 
    catch (error) 
    {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error sending video' });
    }
});

// Route handler for sending images
app.post('/send-images', async (req, res) => {
    const { recipientPhoneNumber, imageId } = req.body;

    // Function to send a single image
    async function sendImage(recipientPhoneNumber, imageId) 
    {
        const body = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'image',
            image: {
                id: imageId
            }
        };

        try 
        {
            const response = await axios.post(urlWithAccessToken, body);
            console.log('Image sent successfully:', response.data);
            return response.data;
        } 
        catch (error) 
        {
            console.error('Error sending image:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    try 
    {
        const result = await sendImage(recipientPhoneNumber, imageId);
        res.json(result);
    } 
    catch (error) 
    {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error sending images' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});