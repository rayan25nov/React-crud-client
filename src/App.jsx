import { React, useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignInForm from "./components/signinform/SignInForm";
import DataComponent from "./components/crud/DataComponent";
// import RequireAuth from "./components/authentication/RequireAuth";
// import StaticTable from "./components/StaticTable";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<SignInForm setIsAuthenticated={setIsAuthenticated} />}
        />
        {isAuthenticated && (
          <Route
            path="/userdata"
            element={<DataComponent setIsAuthenticated={setIsAuthenticated} />}
          />
        )}
      </Routes>
    </>
  );
}

export default App;

// import { React, useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SignInForm from "./components/signinform/SignInForm";
// import DataComponent from "./components/crud/DataComponent";
// // import RequireAuth from "./components/authentication/RequireAuth";
// // import StaticTable from "./components/StaticTable";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("isAuthenticated") === "true"
//   );

//   useEffect(() => {
//     localStorage.setItem("isAuthenticated", isAuthenticated);
//   }, [isAuthenticated]);
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route
//             exact
//             path="/"
//             element={<SignInForm setIsAuthenticated={setIsAuthenticated} />}
//           />
//           {isAuthenticated && (
//             <Route path="/userdata" element={<DataComponent />} />
//           )}
//           {console.log(isAuthenticated)}
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;
