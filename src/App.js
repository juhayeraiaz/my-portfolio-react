import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProjects from './components/AddProjects';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <NavBar />
              <Banner />
              <Skills />
              <Projects />
              <Contact />
              <Footer />
            </>
          } />
          <Route path='/addprojects' element={<AddProjects></AddProjects>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
