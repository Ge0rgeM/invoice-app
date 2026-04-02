export const fetchAllInvoices = async () => {
    try {
        // Change to your InfinityFree domain when deploying
        const response = await fetch('http://localhost:8000/getAllInvoices.php');
        const result = await response.json();
        
        if (response.ok && result.status === 'success') {
            return result.data; // Return the list of invoices
        }
    } catch (err) {
        console.error("Failed to load invoice list", err);
    }
};