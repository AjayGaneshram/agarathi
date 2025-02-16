import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/header/Header.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DataProvider, { DataContext } from './DataContext.jsx'
const WordsByFirstLetter = lazy(() =>
  import("./components/firstLetter/FirstLetterPage.jsx")
);

const App = lazy(() =>
  import("./App.jsx")
);

const WordSummary=lazy(() =>
  import("./components/words/WordSummary.jsx")
);

createRoot(document.getElementById('root')).render(
    <DataProvider>
     <BrowserRouter >
     <Header />
     <Suspense>
     <Routes>
          <Route path="/agarathi/" element={ <App /> } />
          <Route path="/agarathi/home" element={  <App />} />
          <Route
            path="/agarathi/firstLetter/:letter"
            element={<WordsByFirstLetter />}
          />
          <Route
            path="/agarathi/word/:wordName"
            element={<WordSummary />}
          />
          </Routes>
       </Suspense>
    </BrowserRouter>
    </DataProvider>
  ,
)
