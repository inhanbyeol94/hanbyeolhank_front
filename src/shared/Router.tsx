import React from 'react';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import CreateClient from "../pages/CreateClient";
import CreateAccount from "../pages/CreateAccount";
import AntSidebar from "../components/common/AntSidebar";
import {Layout} from "antd";
import AntHeader from "../components/common/AntHeader";
import DespositWithoutPassbook from "../pages/DepositWithoutPassbook";
import Transfer from "../pages/Transfer";
import Balanceinquiry from "../pages/Balanceinquiry";
import GlobalStyles from "../GlobalStyles"

const Router = () => {
    return (
       <BrowserRouter>
           <GlobalStyles />
           <Layout>
               <AntSidebar />
               <Layout>
                   <AntHeader/>
                   <Routes>
                       <Route path="/" element={<CreateClient />}></Route>
                       <Route path="/account" element={<CreateAccount />}></Route>
                       <Route path="/tranfer/nopassbook" element={<DespositWithoutPassbook />}></Route>
                       <Route path="/tranfer" element={<Transfer />}></Route>
                       <Route path="/balanceinquiry" element={<Balanceinquiry />}></Route>
                   </Routes>
               </Layout>
           </Layout>
       </BrowserRouter>
    );
};

export default Router;
