import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../DataContext";

const Modal = ({ wordDetails, onClose }) => {
  if (!wordDetails) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-md flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 max-h-[80vh] overflow-y-auto relative transition-all transform scale-105"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 font-bold text-red-800 hover:text-primary"
        >
          ✕
        </button>
         {/* <button
           onClick={onClose}
            className="p-2 bg-red-800 text-white rounded-full hover:bg-red-700 transition-all flex items-center justify-center float-right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M18.3 5.7a1 1 0 0 0-1.4-1.4L12 9.59 7.1 4.7a1 1 0 1 0-1.4 1.4L10.59 12l-4.89 4.9a1 1 0 1 0 1.4 1.4L12 14.41l4.9 4.89a1 1 0 1 0 1.4-1.4L13.41 12l4.89-4.9z" />
            </svg>
          </button> */}
          
       <h1 className="text-2xl font-bold text-center text-primary">{wordDetails.word}</h1>
       
        <p className="mt-4 text-gray-700 text-lg">
          <b className="text-primary">பொருள் :</b> {wordDetails.detail}
        </p>
        
      </div>
    </div>
  );
};

const WordFirstLetter = ({ wordData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const { outputJson } = useContext(DataContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const filteredWords = useMemo(() => {
    return wordData
      .filter((word) => word.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort();
  }, [searchQuery, wordData]);

  const groupedWords = useMemo(() => {
    return filteredWords.reduce((acc, word) => {
      const letter = word.charAt(0).toUpperCase();
      acc[letter] = acc[letter] ? [...acc[letter], word] : [word];
      return acc;
    }, {});
  }, [filteredWords]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6 border border-red-500 rounded-lg p-2 bg-white relative">
      <span className="p-2 text-red-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 2a8 8 0 0 1 6.32 12.9l4.39 4.39a1 1 0 1 1-1.42 1.42l-4.39-4.39A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 4.24 10.24A6 6 0 0 0 10 4z" />
          </svg>
        </span>
       <input
          ref={inputRef}
          type="text"
          placeholder="சொற்களை தேடுக"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 text-lg border-b-2 border-red-500 focus:outline-none w-full bg-white"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="p-2 bg-red-800 text-white rounded-full hover:bg-red-700 transition-all flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M18.3 5.7a1 1 0 0 0-1.4-1.4L12 9.59 7.1 4.7a1 1 0 1 0-1.4 1.4L10.59 12l-4.89 4.9a1 1 0 1 0 1.4 1.4L12 14.41l4.9 4.89a1 1 0 1 0 1.4-1.4L13.41 12l4.89-4.9z" />
            </svg>
          </button>
        )}
      </div>

      {/* Word List */}
      {filteredWords.length === 0 ? (
        <div className="p-4 text-gray-500 text-center">சொற்கள் கிடைக்கவில்லை</div>
      ) : (
        <div>
          <h2 className="p-4 text-primary text-center">மேலும் தகவலுக்கு சொற்களை அழுத்தவும்</h2>
          {Object.entries(groupedWords)
            .sort()
            .map(([letter, words]) => (
              <div key={letter} className="mb-6">
                {/* <h3 className="text-xl font-semibold text-red-600 mb-2">{letter}</h3> */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {words.map((word) => (
                    <div
                      key={word}
                      className="p-2 bg-gray-100 text-center rounded-lg hover:bg-primary hover:text-white transition-all cursor-pointer"
                      onClick={() => setSelectedWord(outputJson?.eachWord[word])}
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Modal for Word Details */}
      {selectedWord && <Modal wordDetails={selectedWord} onClose={() => setSelectedWord(null)} />}
    </div>
  );
};



export default WordFirstLetter;






// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaLink } from "react-icons/fa6";

// const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
//   const pages = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pages.push(i);
//   }

//   return (
//     <ul className="flex flex-wrap justify-center gap-2 m-4">
//       {currentPage > 1 && (
//         <li>
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             className="px-3 py-1 font-semibold border border-primary rounded text-primary bg-red-50"
//           >
//             « முந்தைய
//           </button>
//         </li>
//       )}
//       {pages.map((page) => (
//         <li key={page}>
//           <button
//             onClick={() => handlePageChange(page)}
//             className={`px-3 py-1 border border-primary rounded ${
//               page === currentPage ? "bg-primary text-white" : ""
//             }`}
//           >
//             {page}
//           </button>
//         </li>
//       ))}
//       {currentPage < totalPages && (
//         <li>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             className="px-3 py-1 font-semibold border border-primary rounded text-primary bg-red-50"
//           >
//             அடுத்து »
//           </button>
//         </li>
//       )}
//     </ul>
//   );
// };

// // Paginated Section (Responsive)
// const PaginatedSection = ({ title, items, renderItem }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   // Adjust items per page based on screen width
//   useEffect(() => {
//     const updateItemsPerPage = () => {
//       if (window.innerWidth > 1200) setItemsPerPage(20);
//       else if (window.innerWidth > 900) setItemsPerPage(16);
//       else if (window.innerWidth > 600) setItemsPerPage(12);
//       else setItemsPerPage(8);
//     };

//     updateItemsPerPage();
//     window.addEventListener("resize", updateItemsPerPage);
//     return () => window.removeEventListener("resize", updateItemsPerPage);
//   }, []);

//   const totalPages = Math.ceil(items.length / itemsPerPage);
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const visibleItems = items.slice(startIdx, startIdx + itemsPerPage);

//   return (
//     <div className="mb-8">
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//         {visibleItems.map(renderItem)}
//       </div>
//       {totalPages > 1 && <Pagination  currentPage={currentPage} totalPages={totalPages} handlePageChange={setCurrentPage} />}
//     </div>
//   );
// };

// const WordListFirstLetter = ({ wordData }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const inputRef = useRef(null);
//   const navigate = useNavigate();
//   const handleNavigate = (word) => navigate(`/agarathi/word/${word}`);
//   useEffect(() => {
//     if (inputRef.current) inputRef.current.focus();
//   }, []);

//   const filteredWords = useMemo(() => {
//     return wordData
//       .filter((word) => word.toLowerCase().includes(searchQuery.toLowerCase()))
//       .sort();
//   }, [searchQuery, wordData]);

//   const groupedWords = useMemo(() => {
//     return filteredWords.reduce((acc, word) => {
//       const letter = word.charAt(0).toUpperCase();
//       acc[letter] = acc[letter] ? [...acc[letter], word] : [word];
//       return acc;
//     }, {});
//   }, [filteredWords]);

//   return (
//     <div className="w-full max-w-5xl mx-auto p-4">
//       {/* Search Bar */}
//       <div className="flex items-center gap-2 mb-6 border border-red-500 rounded-lg p-2 bg-white relative">
//         <span className="p-2 text-red-800">
//           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M10 2a8 8 0 0 1 6.32 12.9l4.39 4.39a1 1 0 1 1-1.42 1.42l-4.39-4.39A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 4.24 10.24A6 6 0 0 0 10 4z" />
//           </svg>
//         </span>

//         <input
//           ref={inputRef}
//           type="text"
//           placeholder="சொற்களை தேடுக"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="flex-1 p-2 text-lg border-b-2 border-red-500 focus:outline-none w-full bg-white"
//         />

//         {searchQuery && (
//           <button
//             onClick={() => setSearchQuery("")}
//             className="p-2 bg-red-800 text-white rounded-full hover:bg-red-700 transition-all flex items-center justify-center"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
//               <path d="M18.3 5.7a1 1 0 0 0-1.4-1.4L12 9.59 7.1 4.7a1 1 0 1 0-1.4 1.4L10.59 12l-4.89 4.9a1 1 0 1 0 1.4 1.4L12 14.41l4.9 4.89a1 1 0 1 0 1.4-1.4L13.41 12l4.89-4.9z" />
//             </svg>
//           </button>
//         )}
//       </div>

//       {/* Word List by First Letter with Pagination */}
//       {filteredWords.length === 0 ? (
//         <div className="p-4 text-gray-500 text-center">சொற்கள் கிடைக்கவில்லை</div>
//       ) : (
//         <div>
//           <h2 className="p-4 m-4 text-primary text-center">மேலும் தகவலுக்கு சொற்களை அழுத்தவும்</h2>
//         {Object.entries(groupedWords)
//           .sort()
//           .map(([letter, words]) => (
//             <PaginatedSection
//               key={letter}
//               title={letter}
//               items={words}
//               renderItem={(word) => (
//                 <div key={word} className="mb-4 p-2 bg-gray-100 text-center rounded-lg hover:bg-primary hover:text-white transition-all cursor-pointer grid grid-flow-col items-center w-auto"
//                 onClick={() => handleNavigate(word)}
//                 >
                  
//                  <span>{word}  </span>
//                 </div>
//               )}
//             />
//           ))}</div>
//       )}
//     </div>
//   );
// };

// export default WordListFirstLetter;