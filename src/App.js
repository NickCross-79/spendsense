import './App.css';
import Nav from './components/Nav'
import BudgetCard from './components/budget-card/BudgetCard'
import SideMenu from './components/SideMenu';

function App() {
  return (
    <div className="App">
      <Nav />
      <BudgetCard />
      <SideMenu />
    </div>
  );
}

export default App;
