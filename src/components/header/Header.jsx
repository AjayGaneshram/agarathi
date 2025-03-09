import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true, // ✅ Instantly register and activate SW
  onNeedRefresh() {
    location.reload(); // ✅ Auto-refresh the page when an update is available
  },
});
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
   
  }, [menuOpen]);


  const homePageNavigate = () => {
    navigate(`/agarathi/`);
    setMenuOpen(false);
  };
  const tirattuPageNavigate = () => {
    navigate(`/agarathi/allWords`);
  };


  return (
    <div className="bg-primary  h-16 w-full relative">
      {/* Navbar */}
      <div className="flex justify-between items-center h-full px-4 md:px-8 border-b-2 border-white-500">
        {/* Logo */}
        <h1 className="text-white font-bold text-lg md:text-2xl cursor-pointer">
          <a onClick={() => homePageNavigate()}>செம்மை சொல்லகராதி</a>
        </h1>
        <div className="hidden md:flex gap-8">
          <h1 className="text-white font-bold text-lg cursor-pointer">
            <a onClick={() => tirattuPageNavigate()}>சொற்திரட்டு</a>
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <span className="text-white text-3xl">
        
              </span>
          ) : 
          (
            <span className="text-white text-3xl">&#9776;</span>
          )}
        </button>
      </div>

      {/* Mobile Menu (Only visible when menuOpen is true) */}
      {menuOpen && (
        <div   ref={menuRef} // Attach ref to the menu
          className="absolute top-full left-0 w-full bg-primary z-50 md:hidden flex flex-col gap-y-2 p-4 shadow-lg">
          <h1 className="text-lg cursor-pointer text-white font-bold" onClick={() => { setMenuOpen(false); tirattuPageNavigate(); }}>
            சொற்திரட்டு
          </h1>
        </div>
      )}
    </div>
  );
};

export default Header;
