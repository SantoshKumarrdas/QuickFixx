import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Homepage";
import { About } from "./pages/Aboutpage";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/footer"
import { Logout } from "./pages/Logout"
import { AdminLayout } from "./layout/Admin-layout";
import { Admincontact } from "./pages/Admin-contact";
import { Adminuser } from "./pages/Admin-user";
import { AdminUpdateUser } from "./pages/AdminUpdateuser";
import { Payment } from "./pages/Paymentpage";
import Cancel from "./pages/Cancel";
import Success from "./pages/Success"
import { Employes } from "./pages/EmployesUsers";
import { UploadForm } from "./pages/Uploademployesdata";
import { Plumber } from "./service/Plumber";
import { Mason } from "./service/Mason";
import { Tile } from "./service/Tile";
import { Carpenter } from "./service/Carpenter";
import { Electrician } from "./service/Electrician";
import { Labour } from "./service/Labour";

//subscribe thapatechnical channel for more awesome content. 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin/users/edit/:id" element={<AdminUpdateUser />} />
        
        <Route path="/data" element={< Employes />} />
        <Route path="/employes" element={<  UploadForm />} />

        <Route path="/plumber" element={< Plumber />} />
        <Route path="/electrician" element={<Electrician/>} />
        <Route path="/mason" element={<Mason/>} />
        <Route path="/tile" element={<Tile/>} />
        <Route path="/labour" element={<Labour/>} />
        <Route path="/carpenter" element={<Carpenter/>} />

        <Route path="/admin" element={<AdminLayout />} >
          <Route path="users" element={<Adminuser />} />
          <Route path="contacts" element={<Admincontact />} />
        </Route>

        <Route>
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Route>

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;