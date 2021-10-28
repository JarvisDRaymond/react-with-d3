import "./App.css";
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
/*
  Note: Both React and D3 want to control the DOM
  By using ref, this is possible
*/

function App() { 
  return (
    <div className="App">
      <h1>React with D3</h1>
      <LineChart />
        <PieChart />
    </div>
  );
}

export default App;
