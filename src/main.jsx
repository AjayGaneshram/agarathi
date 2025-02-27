import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
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

const Header=lazy(() =>
  import("./components/header/Header.jsx")
);

createRoot(document.getElementById('root')).render(
    <DataProvider>
     <BrowserRouter >
     <Header />
     <Suspense>
     <Routes>
          <Route path="/agarathi/" element={ <App /> } />
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
