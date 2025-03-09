import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../DataContext";
import { useNavigate } from "react-router-dom";

const WordList = () => {

	const { outputJson } = useContext(DataContext);
	const [wordData, setWordDetails] = useState([]);

	const navigate = useNavigate();
	const homePageNavigate = () => {
	  navigate(`/agarathi/`);
	}; 
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	  };
	useEffect(()=>{
		outputJson!=null && setWordDetails(
		(outputJson["eachWord"]))
	},[outputJson])
	
  // Convert object to an array and sort alphabetically
  const sortedWords = Object.values(wordData).sort((a, b) =>
    a.word.localeCompare(b.word, "ta") // Tamil sorting
  );

  return (
    (wordData.length!=0 &&
	<div className="bg-red-50">
		
	<div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
	<div className="mb-4">
          <button className="text-red-500 hover:text-orange-700 transition text-lg flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={homePageNavigate}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="cursor-pointer" onClick={homePageNavigate}>
              முகப்புப்பக்கம்
            </span>
          </button>
        </div>
	<button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-8 h-8 bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-900 transition-all"
          title="Scroll to Top"
        >
          ↑
        </button>
	
      <h1 className="text-2xl text-center font-bold text-primary mb-4">செம்மை சொற்திரட்டு</h1>
      <div className="w-full max-w-5xl bg-white p-4 rounded-lg shadow-md">
        {sortedWords.map((item, index) => (
          <div key={index} className="border-b border-gray-300 py-3">
            <h2 className="text-lg font-semibold text-primary">{item.word}</h2>
            <p className="text-gray-600">{item.detail}</p>
          </div>
        ))}
      </div></div>
    </div>)
  );
};

export default WordList;