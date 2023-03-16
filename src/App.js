import './App.css';
import LoginPage from './components/login-page/LoginPage';
import Overview from './components/Overview';
import CreateBudget from './components/create-budget/CreateBudget';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/create-budget' element={<CreateBudget />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='overview' element={<Overview />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
