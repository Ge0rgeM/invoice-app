export const fetchAllDeletedInvoices = async (setLoading = () => {}) => {
    setLoading(true)
    // 1. Fetch the data (No try/catch wrapper!)
    const response = await fetch('http://localhost:8000/getAllDeletedInvoices.php');
    
    // 2. Catch server crashes or CORS issues
    if (!response.ok) {
        try {
            const errorData = await response.json();
            if (errorData.error_code) {
                setLoading(false)
                throw new Error(errorData.error_code); 
            }
        } catch (e) {
            setLoading(false)
            throw new Error("failed_to_fetch");
        }
    }

    // 3. Parse the JSON response
    const result = await response.json();
    
    // 4. Catch handled PHP errors (e.g., table doesn't exist, query failed)
    if (result.status === 'error') {
        // You can add "ERR_FETCH_FAILED" to your ka.json file
        setLoading(false)
        throw new Error(result.error_code || "failed_to_fetch"); 
    }

    // 5. If everything is perfect, return the array of invoices
    setLoading(false)
    return result.data; 
};