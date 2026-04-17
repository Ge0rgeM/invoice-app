export default function ErrorWindow({ message, onClose, t }) {
  // If there is no message, do not render the component at all
  if (!message) return null;

  return (
    // The backdrop: fixed, covers the whole screen, dims the background
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-md">
      
      {/* The modal box itself */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden border-t-4 border-luxury-button animate-fade-in-up">
        
        <div className="p-6">
          <div className="flex items-start gap-4">
            
            {/* SVG Warning Icon */}
            <div className="text-red-500 shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            {/* Text Content */}
            <div>
              <h3 className="text-lg font-bold text-luxury-brown">{t("errors.error")}</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {message}
              </p>
            </div>

          </div>
        </div>
        
        {/* Footer with Close Button */}
        <div className="bg-gray-50 px-6 py-4 flex justify-center gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="bg-luxury-button hover:bg-luxury-button-hovered text-white font-bold py-2 px-6 rounded-md transition-colors cursor-pointer"
          >
            {t("generic.page_refresh")}
          </button>
          <button 
            onClick={onClose}
            className="bg-luxury-button hover:bg-luxury-button-hovered text-white font-bold py-2 px-6 rounded-md transition-colors cursor-pointer"
          >
            {t("generic.close")}
          </button>
        </div>

      </div>
    </div>
  );
}