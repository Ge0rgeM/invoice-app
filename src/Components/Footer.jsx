export default function Footer({ footerRef }) {
    return (        
        <div ref={footerRef} className="h-45 px-12 pt-6 pb-12 bg-white border-t border-gray-200 mt-auto">
          <h3 className="text-gray-800 font-bold mb-3">Payment Instructions</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="mb-1"><span className="font-semibold text-gray-800">Bank Name:</span> Bank of Georgia</p>
              <p className="mb-1"><span className="font-semibold text-gray-800">Account Name:</span> Your Company LLC</p>
            </div>
            <div>
              <p className="mb-1"><span className="font-semibold text-gray-800">Account No (IBAN):</span> GE00BG0000000000000000</p>
              <p className="mb-1"><span className="font-semibold text-gray-800">SWIFT / BIC:</span> BAGAGE22</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-400 text-center italic">
            Thank you for your business. Please process payment within 14 days of receiving this invoice.
          </p>
        </div>
    )
}