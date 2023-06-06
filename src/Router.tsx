import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Main from './pages/main/Main';
import MyPage from './pages/main/MyPage';
import ChangePassword from './pages/auth/ChangePassword';
import SignOut from './pages/main/SignOut';
import ChangeUserInfo from './pages/main/ChangeUserInfo';
import DHTInfo from './pages/info/DHTInfo';
import SoilInfo from './pages/info/SoilInfo';
import CDSInfo from './pages/info/CDSInfo';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/change/password" element={<ChangePassword />} />
        <Route path="/change/userinfo" element={<ChangeUserInfo />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dht" element={<DHTInfo />} />
        <Route path="/soil" element={<SoilInfo />} />
        <Route path="/lux" element={<CDSInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
