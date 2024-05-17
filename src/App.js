import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navBar/navBar';
import Dashbord from './components/dashbord/dashbord';
import BillAdd from './components/billAdd/billAdd';
import GetBill from './components/getBill/getBill';
import SectionLine from './components/sectionLine/sectionLine';
import Reciveamount from './components/Reciveamount/Reciveamount';
import Viewpayment from './components/Viewpayment/Viewpayment';
import Login from './components/Login/Login';
import ViewallBill from './components/ViewallBill/ViewallBill';
import RemainingAllbillList from './components/remainingAllbillList/remainingAllbillList'

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/Login';

  return (
    <React.Fragment>
      {!isLoginPage && <SectionLine />}
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Dashbord />} />
        <Route path="/BillAdd" element={<BillAdd />} />
        <Route path="/GetBill" element={<GetBill />} />
        <Route path="/Reciveamount" element={<Reciveamount />} />
        <Route path="/Viewpayment" element={<Viewpayment />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ViewallBill" element={<ViewallBill />} />
        <Route path="/RemainingAllbillList" element={<RemainingAllbillList />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
