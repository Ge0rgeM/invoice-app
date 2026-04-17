export const sendInvoiceToServer = async (invoiceData) => {
    // 1. Make the request (no try/catch wrapper!)
    const response = await fetch('http://localhost:8000/sendInvoice.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData)
    });

    // 2. Catch server crashes (500 errors, CORS issues)
    if (!response.ok) {
        try {
            const errorData = await response.json();
            if (errorData.error_code) {
                throw new Error(errorData.error_code); 
            }
        } catch (e) {
            throw new Error("failed_to_fetch");
        }
    }

    // 3. Parse the PHP response
    const result = await response.json();

    // 4. Catch handled PHP errors (e.g., missing fields, duplicate invoice)
    if (result.status === 'error') {
        // You can add "ERR_SAVE_FAILED" to your ka.json file!
        throw new Error(result.error_code || "error"); 
    }

    // 5. If it reaches here, the save was 100% successful
    return result; 
};