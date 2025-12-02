// import logo from './logo.svg';
import { React } from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from '../component/MainHeader'
import Footer from '../component/Footer';
import { MyContextProvider } from '../layout/Context';
import { CookiesProvider } from 'react-cookie';
import '../icon.min.css'


function Home() {

    return (
        <MyContextProvider>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
                <div className="wrapper">
                    <MainHeader />

                    <div className="main-body">
                        <div className='container-fluid'>
                            <Outlet />
                        </div>
                    </div>
                    <Footer />
                </div>
            </CookiesProvider>
        </MyContextProvider>
    );
}

export default Home;

