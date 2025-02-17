import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../DataContext";
import WordListFirstLetter from "../words/WordFirstLetter";
const WordsByFirstLetter = () => {
  const [wordsGroupedByFirstLetter, setWordsGroupedByFirstLetter] = useState(
    {}
  );
  const [wordDetails, setWordDetails] = useState({});
  const { letter } = useParams();
  const decodedLetter = decodeURIComponent(letter);
  const { outputJson } = useContext(DataContext);

  useEffect(() => {
    if(outputJson!=null){
    setWordsGroupedByFirstLetter(outputJson["firstLetterWords"] || {});
    setWordDetails(outputJson["eachWord"] || {});}
  }, [outputJson]);

  const navigate = useNavigate();
  const homePageNavigate = () => navigate("/agarathi/home");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div className="bg-red-50">
      {/* <Header /> */}

      <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
        {/* Back Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-8 h-8 bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-900 transition-all"
          title="Scroll to Top"
        >
          ↑
        </button>
        <div className="mb-4">
          <button className="text-red-500 hover:text-orange-700 transition text-lg flex items-center">
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
            <span className="cursor-pointer" onClick={homePageNavigate}>
              முகப்புப்பக்கம்
            </span>
          </button>
        </div>
        {wordsGroupedByFirstLetter[decodedLetter]?.length > 0 && (
          <div>
            <div className="mb-8 text-center">
              <h1 className="sm:text-sm md:text-xl font-extrabold text-primary mb-6">
                <span className="text-2xl">{decodedLetter}</span> வரிசை சொற்கள்
              </h1>
              
              
               <WordListFirstLetter wordData={wordsGroupedByFirstLetter[decodedLetter].sort()} viewType="firstLetter" />  

            </div>
            
          </div>
        )}
        {wordsGroupedByFirstLetter[decodedLetter]?.length == 0 && (
          <p className="text-center text-gray-500 text-lg mt-6">
            இந்த எழுத்திற்கான சொற்கள் இல்லை
          </p>
        )}
      </div>
    </div>
  );
};

export default WordsByFirstLetter;
