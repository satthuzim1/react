import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const HomeContent = lazy(() => import('./component/HomeContent'))
const Home = lazy(() => import('./layout/Home'));
const Login = lazy(() => import('./Login'));
const ProductDetail = lazy(() => import('./component/ProductDetail'))
const Cart = lazy(() => import('./component/Cart'))
const Category = lazy(() => import('./component/Category'))
const PageNotFound = lazy(() => import('./layout/PageNotFound'))
const Admin = lazy(() => import('./layout/AdminHome'))
const AdminHomeContent = lazy(() => import('./component/AdminHomeContent'))
const AddProduct = lazy(() => import('./component/AddProduct'))
const ProductList = lazy(() => import('./component/ProductList'))
const Excell = lazy(() => import('./component/Excell'))
const AddExcelell = lazy(() => import('./component/AddExcel'))
const OrderList = lazy(() => import('./component/OrderList'))
const UploadImg = lazy(() => import('./component/UploadImg'))
const Prompt = lazy(() => import('./component/Prompt'))
const ImgTrain = lazy(() => import('./component/ImgTrain'))

const isAuthenticated = () => {
  if (document.cookie) {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith("user="));
    if (cookieValue) {
      // let decodedCookie = decodeURIComponent(cookieValue)
      // let ca = decodedCookie.split('=');
      // console.log(JSON.parse(ca[1]).token)
      return true
    }
  }
  return false;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path='/login' element={isAuthenticated() ? <Navigate to="/admin" /> : <Login />} />
          <Route path='/admin' element={isAuthenticated() ? <Admin /> : <Navigate to="/login" />}>
            <Route index element={<AdminHomeContent />} />
            <Route path='/admin/add-product' element={<AddProduct />} />
            <Route path='/admin/product-list' element={<ProductList />} />
            <Route path='/admin/excel' element={<Excell />} />
            <Route path='/admin/add-excel' element={<AddExcelell />} />
            <Route path='/admin/order-list' element={<OrderList />} />
            <Route path='/admin/upload-img' element={<UploadImg />} />
            <Route path='/admin/prompt' element={<Prompt />} />
            <Route path='/admin/img-train' element={<ImgTrain />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
          <Route path='/' element={<Home />}>
            <Route index element={<HomeContent />} />
            <Route path='/product/:productId/:productName' element={<ProductDetail />} />
            <Route path='/category/:categoryId/:categoryName' element={<Category />} />
            <Route path='/cart' element={<Cart />} />
            <Route errorElement={<PageNotFound />} />
            {/* <Route path='*' element={<PageNotFound/>}/> */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// cmd: npm start
