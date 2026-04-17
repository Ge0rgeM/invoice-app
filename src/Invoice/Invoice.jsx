import { useEffect, useRef, useState } from 'react';
import Header from '@/Components/Header';
import Body from '@/Components/Body';
import Footer from '@/Components/Footer';
import DownloadInvoice from '@/Components/DownloadInvoice';
import ToggleLanguage from '@/Components/ToggleLanguage';
import SaveInvoice from '@/Components/SaveInvoice';
import { useTranslation } from "react-i18next";
import { fetchNextInvoiceNumber } from '@/ApiRequests/fetchNextInvoiceNumber.js';
import ErrorWindow from '@/Components/ErrorWindow';
import LoadingWindow from '@/Components/LoadingWindow';

export default function Invoice() {
  const { t } = useTranslation(); //Transaltion hook from react-i18next
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(t("loading"));
  const [items, setItems] = useState([]);
  const [client, setClient] = useState({
      name: '',
      address: '',
      email: '',
      invoice_number: t("default_invoice_number"),
      invoice_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
  });

  const headerRef = useRef(null);
  const bodyRef = useRef(null);
  const footerRef = useRef(null); 

  useEffect(() => {
    fetchNextInvoiceNumber(setLoading, setLoadingText, t)
      .then((nextNumber) => {
        if (nextNumber) {
          setClient(prev => ({ ...prev, invoice_number: nextNumber }));
        }
      })
      .catch((error) => {
        let finalMessage = error.message || "Failed to fetch";
        if (finalMessage === "Failed to fetch") {
          finalMessage = t("errors.failed_to_fetch"); // Use the translated message for "Failed to fetch"
        }
        setErrorMessage(finalMessage || t("something_went_wrong"));
        setLoading(false); // Ensure loading is stopped after the fetch attempt, regardless of outcome
      });
  }, []);

  return (
    <div className="w-full bg-luxury-brown p-8 flex flex-col items-center">
      {/*Toggle Language Button */}
      <ToggleLanguage />
      <SaveInvoice 
        client={client} 
        items={items} 
        setErrorMessage={setErrorMessage} 
        setLoadingWindow={setLoading} 
        setLoadingText={setLoadingText} 
        t={t}/>
      {/* Download Invoice Button */}
      <DownloadInvoice headerRef={headerRef} bodyRef={bodyRef} footerRef={footerRef} client={client} />
      {/*Invoice Container 
        The fixed width (w-[210mm] min-h-[297mm]) to mimic A4 paper.
        This ensures your Tailwind layout behaves predictably.
      */}
      <div className="w-[210mm] h-max min-h-[297mm] bg-white shadow-paper text-gray-800 flex flex-col">
        {/* === PART 1: THE HEADER === */}
        <Header headerRef={headerRef} client={client} setClient={setClient} editing={false} />
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