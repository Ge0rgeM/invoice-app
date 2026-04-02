export const handleSelectInvoice = async (invoiceToLoad, setSearchTerm, setIsDropdownOpen, setLoading, setError, onLoadInvoice) => {
    setSearchTerm(invoiceToLoad);
    setIsDropdownOpen(false); // Close the menu
    setLoading(true);
    setError(null);
    
    try {
      // Now fetch the HEAVY data for just this one invoice
      const response = await fetch(`http://localhost:8000/loadInvoice.php?invoice_number=${invoiceToLoad}`);
      const result = await response.json();

      if (response.ok && result.status === 'success') {
        const parsedReactState = JSON.parse(JSON.stringify(result.data));
        onLoadInvoice(parsedReactState); // Send it up to App.jsx to populate the form
      } else {
        setError(result.message || "Could not load full invoice details.");
      }
    } catch (err) {
      setError("Failed to connect to the database.");
      alert(err);
    } finally {
      setSearchTerm('');
      setLoading(false);
    }
  };