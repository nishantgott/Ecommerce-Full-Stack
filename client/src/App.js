import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Layout from './components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import PolicyPage from './pages/PolicyPage';
import PageNotFound from './pages/PageNotFound';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/User/Dashboard';
import PrivateRoute from './components/Routes/privateRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminPrivateRoute from './components/Routes/AdminPrivateRoute';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/User/Orders';
import Profile from './pages/User/Profile';
import Products from './pages/Admin/Products';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<PolicyPage />} />
        <Route path='/*' element={<PageNotFound />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/admin/dashboard" element={<AdminPrivateRoute />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="create-product" element={<CreateProduct />}></Route>
          <Route path="create-category" element={<CreateCategory />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="products" element={<Products />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
