import { sendInvoiceToServer } from '@/ApiRequests/sendInvoiceToServer.js'

export default function SaveInvoice({ client, items }) {
    const handleSaveClick = async () => {
        // Package the data here
        console.log(client, items )
        const dataToSend = {
            invoice_number: client.invoice_number,
            client_firstname: client.name,
            client_email: client.email,
            client_address: client.address,
            total_amount: items.reduce((sum, item) => sum + Number(item.total), 0).toFixed(2),
            invoice_date: "TestNumber",
            invoice_data: items
        };
        console.log("Data to send:", dataToSend);
        // Send it to your separate file
        const result = await sendInvoiceToServer(dataToSend);
        alert(result.message);
    };
    return (
        <button 
            onClick={handleSaveClick}
            className="mb-6 px-6 py-2 bg-luxury-button text-white font-semibold rounded shadow hover:bg-luxury-button-hovered transition-colors cursor-pointer"
        >
            Save
        </button>
    )
}