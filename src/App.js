import './App.css';
import CreateBill from './components/CreateBill';
import PaidBillsList from './components/PaidBillsList';
import UnpaidBillsList from './components/UnpaidBillsList';
// import AddBill from './components/AddBill';
// import UnpaidBillsList from './components/UnpaidBillsList';

function App() {

  return (
      <div>
      <h1>Home</h1>
      <CreateBill />
      <div className="flex">
        <UnpaidBillsList />
        <PaidBillsList />
      </div>
      </div>
  );
}

export default App;
