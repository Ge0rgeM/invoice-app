export const handleSelectInvoice = async (invoiceToLoad, setSearchTerm, setIsDropdownOpen, setLoading, setErrorMessage, onLoadInvoice) => {
    setSearchTerm(invoiceToLoad);
    setIsDropdownOpen(false); // Close the menu
    setLoading(true);
    setErrorMessage(null);
    
    try {
      // Now fetch the HEAVY data for just this one invoice
      const response = await fetch(`http://localhost:8000/loadInvoice.php?invoice_number=${invoiceToLoad}`);
      const result = await response.json();

      if (response.ok && result.status === 'success') {
        const parsedReactState = JSON.parse(JSON.stringify(result.data));
        onLoadInvoice(parsedReactState); // Send it up to App.jsx to populate the form
      } else {
        setErrorMessage(result.message || "Could not load full invoice details.");
        throw new Error(result.error_code)
      }
    } catch (err) {
      setErrorMessage("Failed to connect to the database.");
      throw new Error(err.message)
    } finally {
      setSearchTerm('');
      setLoading(false);
    }
  };