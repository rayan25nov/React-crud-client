import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInForm from "./components/signinform/SignInForm";
import DataComponent from "./components/crud/DataComponent";
// import StaticTable from "./components/StaticTable";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<SignInForm setIsAuthenticated={setIsAuthenticated} />}
          />
          {isAuthenticated && (
            <Route path="/userdata" element={<DataComponent />} />
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
