import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import CreateInvoice from './Invoice/Invoice'
import SearchInvoice from './Invoice/SearchInvoice';
import Database from './Invoice/Database';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import './App.css'

function App() {
  const { t } = useTranslation(); //Transaltion hook from react-i18next
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  return (
    <BrowserRouter>
      <AppContent
        t={t}
        showSaveModal={showSaveModal}
        setShowSaveModal={setShowSaveModal}
        hasUnsavedChanges={hasUnsavedChanges}
        setHasUnsavedChanges={setHasUnsavedChanges}
        pendingNavigation={pendingNavigation}
        setPendingNavigation={setPendingNavigation}
      />
    </BrowserRouter>
  )
}

function AppContent({
  t,
  showSaveModal,
  setShowSaveModal,
  hasUnsavedChanges,
  setHasUnsavedChanges,
  pendingNavigation,
  setPendingNavigation,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreateInvoiceClick = (event) => {
    if (location.pathname === '/edit' && hasUnsavedChanges) {
      event.preventDefault();
      setPendingNavigation('/');
      setShowSaveModal(true);
      return;
    }

    navigate('/');
  };

  return (
    <>
      {/* 1. THE NAVIGATION BAR (This shows up on every page) */}
      <nav className="bg-gray-800 text-white p-4 shadow-md mb-6">
        <div className="max-w-4xl mx-auto flex gap-6 justify-center font-bold">
          {/* <Link> is React's version of an <a> tag. It doesn't refresh the page! */}
          <NavLink to="/" onClick={handleCreateInvoiceClick} className={({isActive}) => isActive ? "text-blue-300" : "hover:text-blue-300"}>{t("create_invoice")}</NavLink>
          <NavLink to="/edit" className={({isActive}) => isActive ? "text-blue-300" : "hover:text-blue-300"}>{t("load_invoice")}</NavLink>
          <NavLink to="/database" className={({isActive}) => isActive ? "text-blue-300" : "hover:text-blue-300"}>{t("load_database")}</NavLink>
        </div>
      </nav>

      {/* 2. THE PAGE ROUTER (This swaps the content based on the URL) */}
      <div className="max-w-4xl mx-auto p-4">
        <Routes>
          {/* If the URL is exactly "/", show the Create page */}
          <Route path="/" element={<CreateInvoice />} />
          
          {/* If the URL is "/edit", show the Search/Edit page */}
          <Route path="/edit" element={<SearchInvoice
            showSaveModal={showSaveModal}
            setShowSaveModal={setShowSaveModal}
            setHasUnsavedChanges={setHasUnsavedChanges}
            pendingNavigation={pendingNavigation}
            setPendingNavigation={setPendingNavigation}
          />} />
          <Route path="/database" element={<Database />} />
        </Routes>
      </div>
    </>
  )
}

export default App;