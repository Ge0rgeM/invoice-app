export const recoverInvoice = async (invoice, setLoading, setLoadingText, setErrorMessage) => {
    setLoading(true);
    setLoadingText("Recovering invoice...");
    setErrorMessage(null);
    try {
        // Now fetch the HEAVY data for just this one invoice
        const response = await fetch(`http://localhost:8000/recoverInvoice.php?invoice_number=${invoice}`);
        const result = await response.json();

        if (response.ok && result.status === 'success') {
            return result.status;
        } else {
            setErrorMessage(result.message || "Could not recover invoice");
            throw new Error(result.message)
        }
    } catch (err) {
        setErrorMessage(err.message || "An error occurred while recovering the invoice");
        throw new Error(err.message)
        console.log("err: ", err);
    } finally {
        setLoading(false);
    }
};

export default recoverInvoice;