import MD from "./components/MD";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h2>MARKDOWN PREVIEWER</h2>
      </header>
      <div className="main-container">
        <MD />
      </div>
    </div>
  );
}

export default App;
