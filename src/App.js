import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddInvoice from "./components/AddInvoice/AddInvoice";
import Invoice from "./components/Invoice/Invoice";
import Home from "./components/Home/Home";
import EditInvoice from "./components/EditInvoice/EditInvoice";
import Invoices from "./components/Invoices/Invoices";

function App() {
  return (
    <div className="App ">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/add-invoice" element={<AddInvoice />} />
          <Route path="/invoices/:id" element={<Invoice />} />
          <Route path="/invoices/:id/edit" element={<EditInvoice />} />
          <Route path="*" element={<h1>404 Not found!</h1>} />
          <Route path="/404" element={<h1>404 Not found!</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
