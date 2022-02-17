import './App.css';
import CreateBill from './components/CreateBill';
import PaidBillsList from './components/PaidBillsList';
import UnpaidBillsList from './components/UnpaidBillsList';
// import AddBill from './components/AddBill';
// import UnpaidBillsList from './components/UnpaidBillsList';

function App() {

  return (
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CreateBill />
          <UnpaidBillsList />
          <PaidBillsList />
        </div>
      </div>
  );
}

export default App;
