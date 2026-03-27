export default function Header({ headerRef }) {
    const invoiceDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    return (        
        <div 
          ref={headerRef} 
          className="grid grid-cols-3 items-center px-12 pt-12 pb-6 border-b bg-white"
        >
          {/* Left: Invoice Details */}
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold text-gray-900">INVOICE</h1>
            <p className="text-sm text-gray-500 mt-2">Invoice #: INV-2026-001</p>
            <p className="text-sm text-gray-500">Date: {invoiceDate}</p>
          </div>
          
          {/* Center: The Logo */}
          <div className="flex justify-center">
            {/* Replace this src with your actual logo path */}
            <img 
              src="../src/assets/Logo.png" 
              alt="Company Logo" 
              className="w-100% object-contain" 
            />
          </div>
          
          {/* Right: Company Details */}
          <div className="flex flex-col items-end text-right">
            <h2 className="text-4xl font-bold text-gray-900">Rosaluna</h2>
            <p className="text-sm text-gray-600 mt-2">Georgia</p>
            <p className="text-sm text-gray-600">Tbilisi</p>
          </div>
        </div>
    )
}