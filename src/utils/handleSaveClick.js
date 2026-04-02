import { sendInvoiceToServer } from '@/ApiRequests/sendInvoiceToServer.js'
import { fetchAllInvoices } from '@/ApiRequests/fetchAllInvoices.js';

export const handleSaveClick = async (client, items, setInitialClient, setInitialItems, setInvoiceList) => {
    const dataToSend = {
        invoice_number: client.invoice_number,
        client_firstname: client.name,
        client_email: client.email,
        client_address: client.address,
        total_amount: items.reduce((sum, item) => sum + Number(item.total), 0).toFixed(2),
        invoice_date: client.invoice_date,
        invoice_data: items
    };
    // Send it to your separate file
    const result = await sendInvoiceToServer(dataToSend);
    alert(result.message);
    if (result.status !== 'success') {
        return "error"; // Don't proceed if save failed
    }
    // Update the initial values
    setInitialClient(client);
    setInitialItems(items);
    // Refresh the invoice list
    const updatedInvoices = await fetchAllInvoices();
    setInvoiceList(updatedInvoices);
};