export const fetchNextInvoiceNumber = async (setLoading, setLoadingText, t) => {
    setLoading(true); // Start loading before the fetch
    setLoadingText(t("fetching_next_invoice_number"));
    // We removed the try/catch here! Let the component handle the errors.
    const response = await fetch('http://localhost:8000/generateInvoiceNumber.php');
    
    // 1. Check if the server returned a 500 or 404 error
    if (!response.ok) {
        setLoadingText(''); // Clear loading text
        setLoading(false); // Stop loading after we get the response
        throw new Error(t('errors.db_error')); // Use the translated message for database errors
    }

    const result = await response.json();
    
    // 2. Check if your PHP script specifically returned an error status
    if (result.status === 'error') {
        setLoadingText(''); // Clear loading text
        setLoading(false); // Stop loading after we get the response
        throw new Error(t(`errors.${result.error_code}`)); // Use the translated message for invoice number generation failure
    }

    // 3. If everything is perfect, return the number
    setLoadingText(''); // Clear loading text
    setLoading(false); // Stop loading after we get the response
    return result.invoice_number; 
};