const axios = require('axios');

const version = 'v18.0';
const phoneNumberId = '255286924341589';
const userAccessToken = 'EAAFtZCeuJop0BO5SU8H9d9ZCZBQodsoilfYPna5HKRnZC2cC7iqHZBaFxxa4tx1ZCKCiXrESVzyYg7AhNsQEBllU9iqQZA327QKbn9k5uwX6OOEkWAtZAZArnhfYSzwVpCeIdVU1eYwVLEHyOwTUZCmpOVrkCd7h49ANRsKw6HuzsTCjvmziq0yJ0Er6KFdKiX8iZC4IE5aZCWd9EgyfDZASimvZBQ';

const baseUrl = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

// Append access token as a query parameter
const urlWithAccessToken = `${baseUrl}?access_token=${userAccessToken}`;

const name = 'John Doe';
const orderId = '#1234h78wehfybf5';
const amtPaid = 1343000.75;
const pendingBalance = 1003535300.0;
const byName = 'Soltrack';

// Function to send a custom message
async function fn_sendCustomMessage(recipientPhoneNumber) 
{
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
        console.log(baseUrl);
        const response = await axios.post(urlWithAccessToken, body);
        console.log('Custom message sent successfully:', response.data);
    } 
    catch (error) 
    {
        console.error('Error sending custom message:', error.response ? error.response.data : error.message);
    }
}

// Function to send a location
async function fn_sendLocation(recipientPhoneNumber) 
{
    const body = {
        messaging_product: 'whatsapp',
        to: recipientPhoneNumber,
        type: 'location',
        location: {
            longitude: '72.5114',
            latitude: '23.0361',
            name: 'Land Rover Cargo Motors',
            address: 'Land Rover Cargo Motors, Nr.Devnagar, Sarkhej - Gandhinagar Hwy, Gota, Ahmedabad, Gujarat 382481'
        }
    };

    try 
    {
        const response = await axios.post(urlWithAccessToken, body);
        console.log('Location sent successfully:', response.data);
    } 
    catch (error) 
    {
        console.error('Error sending location:', error.response ? error.response.data : error.message);
    }
}

// Function to send a contact
async function fn_sendContact(recipientPhoneNumber) 
{
    const body = {
        messaging_product: 'whatsapp',
        to: recipientPhoneNumber,
        type: 'contacts',
        contacts: [
            {
                addresses: [
                    {
                        street: '123 Main St',
                        city: 'Cityville',
                        state: 'Stateville',
                        zip: '12345',
                        country: 'Countryland',
                        country_code: 'CL',
                        type: 'HOME'
                    },
                    {
                        street: '456 Work St',
                        city: 'Worktown',
                        state: 'Workstate',
                        zip: '54321',
                        country: 'Workland',
                        country_code: 'WL',
                        type: 'WORK'
                    }
                ],
                birthday: '1990-01-01',
                emails: [
                    {
                        email: 'work@example.com',
                        type: 'WORK'
                    },
                    {
                        email: 'home@example.com',
                        type: 'HOME'
                    }
                ],
                name: {
                    formatted_name: 'John Doe',
                    first_name: 'John',
                    last_name: 'Doe',
                    middle_name: '',
                    suffix: '',
                    prefix: ''
                },
                org: {
                    company: 'ABC Company',
                    department: 'Engineering',
                    title: 'Software Engineer'
                },
                phones: [
                    {
                        phone: '123-456-7890',
                        type: 'HOME'
                    },
                    {
                        phone: '987-654-3210',
                        type: 'WORK',
                        wa_id: '9876543210'
                    }
                ],
                urls: [
                    {
                        url: 'https://www.worksite.com',
                        type: 'WORK'
                    },
                    {
                        url: 'https://www.homesite.com',
                        type: 'HOME'
                    }
                ]
            }
        ]
    };

    try 
    {
        const response = await axios.post(urlWithAccessToken, body);
        console.log('Contact sent successfully:', response.data);
    } 
    catch (error) 
    {
        console.error('Error sending contact:', error.response ? error.response.data : error.message);
    }
}

// Function to send media (document)
async function fn_sendMedia(recipientPhoneNumber) 
{
    const body = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: recipientPhoneNumber,
        type: 'document',
        document: {
            filename: 'Entity Wise Document List',
            link: 'https://www.pbssd.gov.in/files/public/training_partner/EntityDocs.pdf'
        }
    };

    try 
    {
        const response = await axios.post(urlWithAccessToken, body);
        console.log('Media sent successfully:', response.data);
    } 
    catch (error) 
    {
        console.error('Error sending media:', error.response ? error.response.data : error.message);
    }
}

// Example usage
const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';

fn_sendCustomMessage(919724724658);
// fn_sendLocation(919724724658);
// fn_sendContact(919724724658);
// fn_sendMedia(919724724658);