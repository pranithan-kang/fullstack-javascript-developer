import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import BasicThings from './components/BasicThings';
import ListRendering from './components/ListRendering';
import Footer from './components/Footer';
import StyleExperimental from './components/StyleExperimental';
import StateExperimental from './components/StateExperimental';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Header />
        <BasicThings></BasicThings>
        <ListRendering></ListRendering>
        <StyleExperimental />
        <StateExperimental />
      </header>
      <Footer title="GBDi" isOpen />
      {/* equal to <Footer title="GBDi" isOpen={true} /> */}
    </div>
  );
}

export default App;
