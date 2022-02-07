import logo from './logo.svg';
import './App.css';
import AddBill from './components/AddBill';
import UnpaidBillsList from './components/UnpaidBillsList';
import Login from './components/Login';

function App() {
  return (
    <div>
      <Login />
      {/* <AddBill />
      <UnpaidBillsList/> */}
    </div>
  );
}

export default App;
