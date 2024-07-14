import './App.css';
import React, {useState} from 'react';
import News from './components/News';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App =()=> {

  const apikey = process.env.REACT_APP_API_KEY


  const [progress, setProgress] = useState(0);

    return (
      <BrowserRouter>
        <div>

          <LoadingBar 
            color='#f11946'
            progress={progress}

          />
          <Navbar />
          <Routes>

            <Route exact path="/" element={<News key="general" setProgress={setProgress} apikey={apikey} pageSize={20} country="in" category="general"/>}/>
            <Route exact path="/business" element={<News key="business" setProgress={setProgress} apikey={apikey} pageSize={20} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<News key="entertainment" setProgress={setProgress} apikey={apikey} pageSize={20} country="in" category="entertainment"/>}/>
            <Route exact path="/health" element={<News key="health" setProgress={setProgress} apikey={apikey} pageSize={20} country="in" category="health"/>}/>
            <Route exact path="/science" element={<News key="science" setProgress={setProgress} apikey={apikey} pageSize={20} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<News key="sports" setProgress={setProgress} apikey={apikey} pageSize={20} country="in" category="sports"/>}/>
            <Route exact path="/technology" element={<News key="technology" setProgress={setProgress} apikey={apikey} pageSize={20} country="in" category="technology"/>}/>

          </Routes>
          </div>
        </BrowserRouter>

    )
  
}
export default App;
