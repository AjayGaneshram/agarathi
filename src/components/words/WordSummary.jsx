import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../DataContext"; 

const WordSummary = () => {
  const [wordDetails, setWordDetails] = useState([]);
  const { wordName } = useParams();
  const decodedWord = decodeURIComponent(wordName);
  const navigate = useNavigate();
  const homePageNavigate = () => {
    navigate(`/agarathi/home`);
  };

  const { outputJson } = useContext(DataContext);
  useEffect(() => {
    const fetchWordData = async () => {
      outputJson!=null && setWordDetails(outputJson["eachWord"][decodedWord]);
    };
    fetchWordData();
  }, [outputJson,decodedWord]);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-red-50">
      {/* <Header /> */}
      <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
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
        {wordDetails.length != 0 && (
          <div>
            {/* Word Title */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-extrabold text-primary">
                {wordDetails.word}
              </h1>
              <p className="text-gray-700 mt-4 text-lg flex item-center flex-col">
                <b className="text-primary">பொருள்</b>{" "}
                <span>{wordDetails.detail}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordSummary;
