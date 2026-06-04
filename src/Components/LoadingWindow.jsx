export default function LoadingWindow({ text }) {
    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center transform transition-all">
            {/* The Tailwind CSS Spinner */}
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-luxury-button mb-4"></div>
            {/* <p className="text-lg font-bold text-gray-800">Loading Invoice...</p> */}
            <p className="text-sm text-gray-500 mt-1 font-semibold">{text}</p>
          </div>
        </div>
    )
}