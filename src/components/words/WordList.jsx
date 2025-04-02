import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../DataContext";
import { useNavigate } from "react-router-dom";

const WordList = () => {
  const { outputJson } = useContext(DataContext);
  const [wordData, setWordDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (outputJson) {
      setWordDetails(outputJson["eachWord"]);
    }
  }, [outputJson]);

  // Convert object to array and sort alphabetically
  const sortedWords = Object.values(wordData).sort((a, b) =>
    a.word.localeCompare(b.word, "ta")
  );

  // Filter words based on search input (word + detail)
  const filteredWords = sortedWords.filter(
    (item) =>
      item.word.includes(searchTerm)
  );
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    wordData.length !== 0 && (
      <div className="bg-red-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md">
          {/* Back to Home Button */}
          <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-8 h-8 bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-900 transition-all"
          title="Scroll to Top"
        >
          ↑
        </button>
          <div className="mb-4">
            <button
              className="text-red-500 hover:text-orange-700 transition text-lg flex items-center"
              onClick={() => navigate(`/agarathi`)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>முகப்புப்பக்கம்</span>
            </button>
          </div>

          <h1 className="text-xl text-center font-bold text-red-900 mb-4">செம்மை சொற்திரட்டு</h1>
          <div className="flex items-center gap-2 mb-6 border border-red-500 rounded-lg p-2 bg-white relative">
      <span className="p-2 text-red-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 2a8 8 0 0 1 6.32 12.9l4.39 4.39a1 1 0 1 1-1.42 1.42l-4.39-4.39A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 4.24 10.24A6 6 0 0 0 10 4z" />
          </svg>
        </span>
       <input
          type="text"
          placeholder="சொற்களை தேடுக"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 text-lg border-b-2 border-red-500 focus:outline-none w-full bg-white"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="p-2 bg-red-800 text-white rounded-full hover:bg-red-700 transition-all flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M18.3 5.7a1 1 0 0 0-1.4-1.4L12 9.59 7.1 4.7a1 1 0 1 0-1.4 1.4L10.59 12l-4.89 4.9a1 1 0 1 0 1.4 1.4L12 14.41l4.9 4.89a1 1 0 1 0 1.4-1.4L13.41 12l4.89-4.9z" />
            </svg>
          </button>
        )}
      </div>

      {filteredWords.length === 0 ? (
        <div className="p-4 text-gray-500 text-center">சொற்கள் கிடைக்கவில்லை</div>
      ): <div className="w-full max-w-5xl bg-white p-4 rounded-lg shadow-md">
      {filteredWords.map((item, index) => (
        <div key={index} className="border-b border-gray-300 py-3">
          <h2 className="text-lg font-semibold text-primary">{item.word}</h2>
          <p className="text-gray-600">{item.detail}</p>
        </div>
      ))}
    </div>}
    
        </div>
      </div>
    )
  );
};

export default WordList;
