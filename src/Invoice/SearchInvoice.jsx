import { useRef, useState, useEffect } from 'react';
import Header from '@/Components/Header';
import Body from '@/Components/Body';
import Footer from '@/Components/Footer';
import DownloadInvoice from '@/Components/DownloadInvoice';
import ToggleLanguage from '@/Components/ToggleLanguage';
import SaveInvoice from '@/Components/SaveInvoice';
import InvoiceSearcher from '../Components/InvoiceSearcher';
import { useTranslation } from "react-i18next";
import { SavingWindow } from '@/Components/SavingWindow';
import LoadingWindow from '@/Components/LoadingWindow';
import ErrorWindow from '@/Components/ErrorWindow';

export default function SearchInvoice() {
  const { t } = useTranslation(); 
  const [invoiceList, setInvoiceList] = useState([]);  // State to trigger re-render after loading invoice
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [initialClient, setInitialClient] = useState({
      name: '',
      address: '',
      email: '',
      invoice_number: '',
      invoice_date: ''
  });
  const [initialItems, setInitialItems] = useState([]);

//State for the line items
  const [items, setItems] = useState([]);
  const [client, setClient] = useState({
      name: '',
      address: '',
      email: '',
      invoice_number: '',
      invoice_date: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(t("generic.loading"));
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('')
  const [pendingInvoiceToLoad, setPendingInvoiceToLoad] = useState(null);

  const headerRef = useRef(null);
  const bodyRef = useRef(null);
  const footerRef = useRef(null); 
    // Check if client or items have changed
    const isDirty = JSON.stringify(client) !== JSON.stringify(initialClient) ||
                    JSON.stringify(items) !== JSON.stringify(initialItems);
    // Warn the user if they try to close or refresh the tab with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = ''; 
            }
        };  
        // Tell the browser window to listen for the close/refresh event
        window.addEventListener('beforeunload', handleBeforeUnload);
        // CLEANUP: Stop listening if the component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty]); // This array tells React to re-run this hook whenever `isDirty` changes
    
    const onLoadInvoice = (invoiceData) => {
      console.log("Invoice data received in App.jsx:", invoiceData);
      setInitialClient({
        name: invoiceData.client_firstname,
        address: invoiceData.client_address,
        email: invoiceData.client_email,
        invoice_number: invoiceData.invoice_number,
        invoice_date: invoiceData.invoice_date
      });
      setClient({
        name: invoiceData.client_firstname,
        address: invoiceData.client_address,
        email: invoiceData.client_email,
        invoice_number: invoiceData.invoice_number,
        invoice_date: invoiceData.invoice_date
      });
      setInitialItems(JSON.parse(invoiceData.full_invoice_data));
      setItems(JSON.parse(invoiceData.full_invoice_data));
    }

  return (
    <div className="w-full bg-luxury-brown p-8 flex flex-col items-center">
      {showSaveModal && (
        <SavingWindow
          client={client} 
          items={items} 
          setInitialClient={setInitialClient}
          setInitialItems={setInitialItems}
          setShowSaveModal={setShowSaveModal}
          setInvoiceList={setInvoiceList}
          onLoadInvoice={onLoadInvoice} 
          setSearchTerm={setSearchTerm}
          setIsDropdownOpen={setIsDropdownOpen}
          setLoading={setLoading}
          setErrorMessage={setErrorMessage}
          pendingInvoiceToLoad={pendingInvoiceToLoad}
          setPendingInvoiceToLoad={setPendingInvoiceToLoad}
        />
      )}
        <div className='w-[70%]'>
            <div className='w-full flex justify-center gap-1'>
                {/*Toggle Language Button */}
                <ToggleLanguage />
                {/* Save Invoice Button */}
                <SaveInvoice 
                  setInvoiceList={setInvoiceList}
                  client={client} 
                  items={items} 
                  setInitialClient={setInitialClient}
                  setInitialItems={setInitialItems}
                  t={t}
                  setErrorMessage={setErrorMessage}
                  setLoadingWindow={setLoading}
                  setLoadingText={setLoadingText}
                />
            </div>
            {/* Download Invoice Button */}
            <div className='w-full flex justify-center'>
                <DownloadInvoice headerRef={headerRef} bodyRef={bodyRef} footerRef={footerRef} client={client} />
            </div>
            <InvoiceSearcher 
              isDirty={isDirty} 
              invoiceList={invoiceList}
              setInvoiceList={setInvoiceList}
              setShowSaveModal={setShowSaveModal} 
              onLoadInvoice={onLoadInvoice} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              setLoading={setLoading}
              setErrorMessage={setErrorMessage}
              setPendingInvoiceToLoad={setPendingInvoiceToLoad}
              t={t}
              />
        </div>

      {/*Invoice Container 
        The fixed width (w-[210mm] min-h-[297mm]) to mimic A4 paper.
        This ensures Tailwind layout behaves predictably.
      */}
      <div className="w-[210mm] h-max min-h-[297mm] bg-white shadow-paper text-gray-800 flex flex-col">
        {/* === PART 1: THE HEADER === */}
        <Header headerRef={headerRef} client={client} setClient={setClient} editing={true}/>
        {/* === PART 2: THE BODY === */}
        <Body bodyRef={bodyRef} client={client} setClient={setClient} items={items} setItems={setItems} />
        {/* === 3. FOOTER SECTION (Stuck to bottom on screen and PDF) === */}
        <Footer footerRef={footerRef} />
      </div>

      {/* Floating Popups */}
      {loading && <LoadingWindow text={loadingText} />}
      <ErrorWindow 
        message={errorMessage} 
        onClose={() => setErrorMessage('')} // Empties the message, closing the modal
        t={t}
      />
    </div>
  );
}