import { useRef, useState } from 'react';
import Header from '@/Header';
import Body from '@/Body';
import Footer from '@/Footer';
import DownloadInvoice from '@/DownloadInvoice';

export default function Invoice() {
    const [client, setClient] = useState({
        name: 'Acme Corp',
        address: '456 Client Road\nSuite 100\nTbilisi, Georgia',
        email: 'hello@acmecorp.com'
    });

  const headerRef = useRef(null);
  const bodyRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      {/* Action Button */}
      <DownloadInvoice headerRef={headerRef} bodyRef={bodyRef} footerRef={footerRef} client={client} />
      {/*Invoice Container 
        The fixed width (w-[210mm] min-h-[297mm]) to mimic A4 paper.
        This ensures your Tailwind layout behaves predictably.
      */}
      <div className="w-[210mm] h-max min-h-[297mm] bg-white shadow-lg text-gray-800 flex flex-col">
        {/* === PART 1: THE HEADER === */}
        <Header headerRef={headerRef} />
        {/* === PART 2: THE BODY === */}
        <Body bodyRef={bodyRef} client={client} setClient={setClient} />
        {/* === 3. FOOTER SECTION (Stuck to bottom on screen and PDF) === */}
        <Footer footerRef={footerRef} />
      </div>
    </div>
  );
}