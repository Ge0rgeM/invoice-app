import { sendInvoiceToServer } from '@/ApiRequests/sendInvoiceToServer.js'
import { fetchAllInvoices } from '@/ApiRequests/fetchAllInvoices.js';

export const handleSaveClick = async (
    client, 
    items, 
    setInitialClient, 
    setInitialItems, 
    setInvoiceList, 
    setErrorMessage, 
    setLoadingWindow, 
    setLoadingText,
    t
) => {
    try {
        setLoadingWindow(true); // Show loading window while saving
        setLoadingText(t("saving")); // Set loading text to "Saving..."
        
        const dataToSend = {
            invoice_number: client.invoice_number,
            client_firstname: client.name,
            client_email: client.email,
            client_address: client.address,
            total_amount: items.reduce((sum, item) => sum + Number(item.total), 0).toFixed(2),
            invoice_date: client.invoice_date,
            invoice_data: items
        };
        
        // 1. Send it to your separate file. 
        // If this fails, it instantly jumps down to the 'catch' block!
        await sendInvoiceToServer(dataToSend);
        
        // 2. If we reach this line, the save was 100% successful.
        if(setInitialClient && setInitialItems) {
            setInitialClient(client);
            setInitialItems(items);
        }
        // 3. Refresh the invoice list (If this fails, it also jumps to 'catch')
        if(setInvoiceList) {
            const updatedInvoices = await fetchAllInvoices(setLoadingWindow);
            setInvoiceList(updatedInvoices);
        }

    } catch (error) {
        // Intercept browser network errors
        console.log(error)
        let errorCode = error.message;
        if (errorCode === "Failed to fetch") {
            errorCode = "failed_to_fetch";
        }

        // Trigger your global error window!
        console.log(t(`errors.${errorCode}`))
        setErrorMessage(t(`errors.${errorCode}`));
        
        return "error"; // Don't proceed if save failed

    } finally {
        // The 'finally' block ALWAYS runs at the very end.
        // This guarantees your loading screen disappears, preventing infinite spinning!
        setLoadingText('');
        setLoadingWindow(false); 
    }
};