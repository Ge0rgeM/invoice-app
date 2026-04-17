import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import CreateInvoice from './Invoice/Invoice'
import SearchInvoice from './Invoice/SearchInvoice';
import { useTranslation } from "react-i18next";
import './App.css'

function App() {
  const { t } = useTranslation(); //Transaltion hook from react-i18next
  return (
    <BrowserRouter>
      {/* 1. THE NAVIGATION BAR (This shows up on every page) */}
      <nav className="bg-gray-800 text-white p-4 shadow-md mb-6">
        <div className="max-w-4xl mx-auto flex gap-6 justify-center font-bold">
          {/* <Link> is React's version of an <a> tag. It doesn't refresh the page! */}
          <NavLink to="/" className={({isActive}) => isActive ? "text-blue-300" : "hover:text-blue-300"}>{t("create_invoice")}</NavLink>
          <NavLink to="/edit" className={({isActive}) => isActive ? "text-blue-300" : "hover:text-blue-300"}>{t("load_invoice")}</NavLink>
        </div>
      </nav>

      {/* 2. THE PAGE ROUTER (This swaps the content based on the URL) */}
      <div className="max-w-4xl mx-auto p-4">
        <Routes>
          {/* If the URL is exactly "/", show the Create page */}
          <Route path="/" element={<CreateInvoice />} />
          
          {/* If the URL is "/edit", show the Search/Edit page */}
          <Route path="/edit" element={<SearchInvoice />} />
        </Routes>
      </div>
    </BrowserRouter>
    // <div className="App origin-top scale-[0.50] min-[600px]:scale-75 min-[800px]:scale-100 w-full h-full">
    //   <Invoice />
    // </div>
  )
}

export default App
