export const checkInvoiceNumber = async (invoiceNumber) => {
    try {
        const response = await fetch('http://localhost:8000/checkInvoiceNumber.php?invoice_number=' + invoiceNumber, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        return result.exists;
    } catch (error) {
        console.error("Error checking invoice number:", error);
        return false;
    }
}