import './App.css';
import LoginPage from './components/login-page/LoginPage';
import Overview from './components/Overview';
import Nav from './components/Nav';
import BudgetCard from './components/budget-card/BudgetCard';
import SideMenu from './components/side-menu/SideMenu';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='login' element={<LoginPage />} />
          <Route path='overview' element={<Overview />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
