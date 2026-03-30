export const sendInvoiceToServer = async (invoiceData) => {
    try {
        const response = await fetch('http://localhost:8000/sendInvoice.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData) // Use the passed-in data
    });

    return await response.json();

    } catch (error) {
        console.error("Failed to connect", error);
        return { status: "error", message: "Network error" };
    }
};