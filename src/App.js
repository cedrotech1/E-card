
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing components from the landing pages
import Home from "./pages/landing/home";
import Contact from "./pages/landing/contact";
import About from "./pages/landing/about";
import Login from "./pages/landing/login";
import CustomerRegister from "./pages/landing/customer_register";
import RestRegister from "./pages/landing/restaurent_admin";
import NotFound from './pages/landing/notfound';
import Logout from './pages/landing/logout';
import Statistics1 from './components/statistics';
import Reset from './pages/landing/reset';
import Code from './pages/landing/code';
import ResetPassword from './pages/landing/resetPassword';

// Importing components from the customer pages    
import List from "./pages/customer/reslist";
import Details from "./pages/customer/RestoDetails";
import OneRes from "./pages/customer/oneres";
import Confirm from "./pages/customer/confirms";
import Mycards from "./pages/customer/mycards";
import History from "./pages/customer/cardHistory";
import Prof from "./pages/customer/user-profile";

// Importing components from the Admin pages
import Dash from "./pages/Admin/dash";
import Statistics from "./pages/Admin/statistics";
import Restos from "./pages/Admin/restos";
import OneResto from "./pages/Admin/oneResto";

// Importing components from the Admin resto pages
import Dasha from "./pages/AdminResto/homePage";
import Card from "./pages/AdminResto/Card-category";
import Statisticsa from "./pages/AdminResto/statistics";
import Onecard from "./pages/AdminResto/oneResto";
import Rcustomer from "./pages/AdminResto/customers";
import Setting from "./pages/AdminResto/user-profile";
import AddResto from "./pages/AdminResto/addRestaurent";
import OurResto from "./pages/AdminResto/restaurentPage";
import OurCate from "./pages/AdminResto/categoryPage";
import OurReport from "./pages/AdminResto/report";

// Importing components from the Employee  pages
import Customers from "./pages/employee/customers";
import Has from "./pages/employee/meal_card";
import Not from "./pages/employee/meal_card_not";
import View from "./pages/employee/CustomerReqest";
import Confirmx from "./pages/employee/customers_confirm";
import EmployeeStatistic from "./pages/employee/statistics";
// import OneRestoa from "./pages/AdminResto/oneResto";


// Main App component
function App() {
  return (
    // Set up the BrowserRouter for handling routes
    <BrowserRouter>
      {/* Define the routes using the Routes component */}
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<Home />} exact={true} />
        <Route path="/contact" element={<Contact />} exact={true} />
        <Route path="/about" element={<About />} exact={true} />
        <Route path="/login" element={<Login />} exact={true} />
        <Route path="/register" element={<CustomerRegister />} exact={true} />
        <Route path="/restoAdmin" element={<RestRegister />} exact={true} />
        <Route path="/logout" element={<Logout />} exact={true} />
        <Route path="/Statistics1" element={<Statistics1 />} exact={true} />
        <Route path="/reset" element={<Reset />}/>
        <Route path="/code/:email" element={<Code />}/>
        <Route path="/resetPassword/:email" element={<ResetPassword />}/>
        

        {/* Customer Pages */}
        <Route path="/list" element={<List />} exact={true} />
        <Route path="/details/:id" element={<Details />} exact={true} />
        <Route path="/one/:id" element={<OneRes />} exact={true} />
        <Route path="/confirm" element={<Confirm />} exact={true} />
        <Route path="/mycards" element={<Mycards />} exact={true} />
        <Route path="/history/:id" element={<History />} exact={true} />
        <Route path="/profile" element={<Prof />} exact={true} />
        <Route path="*" element={<NotFound />} />

        {/* Admin Pages */}
        <Route path="/admin_dash" element={<Dash />} exact={true} />
        <Route path="/admin_statistics" element={<Statistics />} exact={true} />
        <Route path="/admin_restourent" element={<Restos />} exact={true} />
        <Route path="/admin_view_one_rest" element={<OneResto />} exact={true} />
        

        {/* emplyoyee Pages */}
        <Route path="/emplyoyee_customers" element={<Customers />} exact={true} />
        <Route path="/emplyoyee_customers_request" element={<View />} exact={true} />
        <Route path="/emplyoyee_confirms" element={<Confirmx />} exact={true} />
        <Route path="/employee_statistics" element={<EmployeeStatistic />} exact={true} />
        <Route path="/emplyoyee_meal_card/:id" element={<Has />} exact={true} />
        <Route path="/emplyoyee_meal_cardx/:id" element={<Not />} exact={true} />
        {/* Admin Resto Pages */}
        <Route path="/resto_dash" element={<Dasha />} exact={true} />
        <Route path="/resto_card/" element={<Card />} exact={true} />
        <Route path="/resto_statistics" element={<Statisticsa />} exact={true} />
        <Route path="/resto_one_card" element={<Onecard />} exact={true} />
        <Route path="/resto_customers" element={<Rcustomer />} exact={true} />
        <Route path="/settings" element={<Setting />} exact={true} />
        <Route path="/resto_AddResto" element={<AddResto/>} exact={true} />
        <Route path="/resto_view" element={<OurResto/>} exact={true} />
        <Route path="/resto_cate_view/:id" element={<OurCate/>} exact={true} />
        <Route path="/resto_report_view" element={<OurReport/>} exact={true} />
  
      </Routes>
    </BrowserRouter>
  );
}

// Export the App component as the default export    OurResto
export default App;
