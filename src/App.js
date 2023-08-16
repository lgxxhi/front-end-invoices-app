import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddInvoice from "./components/AddInvoice/AddInvoice";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/add-invoice" element={<AddInvoice />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
