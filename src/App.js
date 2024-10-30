import { SignIn } from './components/Signin';
import { SignUp } from './components/signup';
import {Routes,Route} from 'react-router-dom'
import ForgotPasswordForm from './components/forgotpassword';
import DashBoard from './components/display';
import First from './components/first';
import { SellerRegistration } from './components/sellerform';
import SportsNews from './components/news';
import BuyerProfile from './components/profile';
import Header from './components/sample';
import AddItem from './components/seller/AddProduct';
import Cart from './components/cart/Cart';
import MainRefur from './components/refurish/MainRefur';
import ItemGrid from './components/Shopping';

function App() {

  // const verify=sessionStorage?.auth && JSON.parse(sessionStorage?.auth)?.email

  return (
    <div>
      <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/forgot-password' element={<ForgotPasswordForm/>}/>
      <Route path='/main' element={<DashBoard />}/>
      <Route path='/' element={<First/>}/>
      <Route path='/profile' element={<BuyerProfile/>}/>
      <Route path='/seller-registration' element={<SellerRegistration/>}/>
      <Route path='/news' element={<SportsNews/>}/>
      <Route  path="/sample" element={<Header/>}/>
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/refurbished" element={<MainRefur />} />
      <Route path='/shopping' element={<ItemGrid/>}/>
      </Routes>
    </div>
  );
}

export default App;