import './App.css';
import LoginPage from './components/login-page/LoginPage';
import Nav from './components/Nav';
import BudgetCard from './components/budget-card/BudgetCard';
import SideMenu from './components/side-menu/SideMenu';

function App() {
  return (
    <div className="App">
      {/* <Nav />
      <BudgetCard />
      <SideMenu /> */}
      <LoginPage />
    </div>
  );
}

export default App;
