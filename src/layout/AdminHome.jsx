import { React, useEffect, useState, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../images/logo.png'
import '../icon.min.css'
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Img from '../images/products/th-truemilk.png'
import logo_sm from '../images/logo-sm.png'
import { useCookies } from 'react-cookie'


function LinkComp(props) {
  return (
    <>
      {props.children.map((val, key) => {
        return (<li key={key}>
          <Link to={val.url} className={val.url === props.pathName ? 'active' : ''}>{val.name}</Link>
        </li>)
      })}
    </>
  )
}
function Expand(props) {

  const decoratedOnClick = useAccordionButton(props.show && props.id);

  return (
    <>
      <Link to={'#'}
        onClick={decoratedOnClick}
        aria-controls="sidebarDashboards"
        className="side-nav-link">
        <i className={props.icon}></i>
        {/* <span className="badge bg-success float-end">5</span> */}
        <span className={props.show ? ' ' : 'none'}>{props.name} </span>
      </Link>
      <Accordion.Collapse eventKey={props.id} >
        <div id="sidebarDashboards" className='sidebarDashboards'>
          <ul className="side-nav-second-level">
            {props.children}
          </ul>
        </div>
      </Accordion.Collapse>

      {!props.show && (<div id="sidebarDashboards" className='sidebarDashboards'>
        <div className='menu-name'>
          {props.name}
        </div>
        <ul className="side-nav-second-level">
          {props.children}
        </ul>
      </div>)}
    </>
  );
}

function UserDropDown(props) {
  const dropdownRef = useRef(null);
  const [dropDown, setDropDown] = useState(false)


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false)
      } else {
        // dropDown ? setDropDown(false) : setDropDown(true)
        setDropDown(true)
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropDown]);
  const logOut = (e) => {
    e.preventDefault();
    props.removeCookie('user')
    window.location = '/login'
  }
  return (
    <div className='account-user' ref={dropdownRef}>
      <Link >
        <div className='account-user-avatar'>
          <img src={Img} alt='avatar' />
        </div>
        <div className='account-info'>
          <div className='name'>
            {props.userName}
          </div>
          <div className='position'>
            Seller
          </div>
        </div>
      </Link>

      <div className={dropDown ? 'user-dropdown dropdown-menu-animated' : 'user-dropdown dropdown-menu-animated none'}>
        <ul>
          <li>
            <Link className="dropdown-item">
              <i className="mdi mdi-account-circle "></i>
              <span>My Account</span>
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" onClick={logOut}>
              <i className="mdi mdi-logout "></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>

  )
}
function Admin() {
  const [show, setShow] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [userName, setUserName] = useState('')

  useEffect(()=>{
    setUserName(cookies.user.name)
  },[])

  return (
    < div className='wrapper-admin'>
      <div className={show ? 'mini-side-bar max' : 'mini-side-bar mini'}>
        <div className='logo'>
          <Link to={'/admin'}>
            <span className={show ? 'none' : 'logo-sm'}>
              <img src={logo_sm} alt="small logo" />
            </span>
          </Link>
          <Link to="/admin" className={show ? 'logo logo-light' : 'none'}>
            <span className="logo-lg">
              <img src={logo} alt="logo" />
            </span>

          </Link>
        </div>
        <div className='menu-container'>

          <Accordion >
            <ul className='side-nav'>

              <li className={show ? 'side-nav-title' : 'none'}>Navigation</li>
              <li className={show ? 'side-nav-item' : 'menu-li'}>

                {/* <i className={(pathName == '/admin/add-product' || pathName == '#') ? 'uil-home-alt icon-active' : 'uil-home-alt'}></i> */}


                <Expand name={'Các loại mặt hàng'} id='0' icon={'uil-home-alt'} show={show}>
                  <LinkComp >
                    {[
                      { url: '/admin/add-product', name: 'Thêm mặt hàng' },
                      { url: '/admin/product-list', name: 'Danh sách mặt hàng' }
                    ]}
                  </LinkComp>
                </Expand>
              </li>

              <li className={show ? 'side-nav-item' : 'menu-li'}>
                {/* <i className={active === 2 ? 'uil-list-ul icon-active' : 'uil-list-ul'}></i> */}
                <Expand name={'Đơn hàng'} id='1' icon={'uil-list-ul'} show={show}>
                  <LinkComp>
                    {[
                      { url: '/admin/order-list', name: 'Danh sách đơn hàng' },
                      { url: '123', name: 'Tạo đơn hàng' }
                    ]}
                  </LinkComp>
                </Expand>
              </li>
              <li className={show ? 'side-nav-item' : 'menu-li'}>
                {/* <i className={active === 2 ? 'uil-list-ul icon-active' : 'uil-list-ul'}></i> */}
                <Expand name={'Đơn hàng'} id='1' icon={'uil-list-ul'} show={show}>
                  <LinkComp>
                    {[
                      { url: '/admin/upload-img', name: 'Upload IMG' },
                       { url: '/admin/Prompt', name: 'Create prompt' }
                    ]}
                  </LinkComp>
                </Expand>
              </li>

              {/* <li className={show ? 'side-nav-item' : 'menu-li'}> */}
                {/* <i className={active === 3 ? 'uil-chart-line icon-active' : 'uil-chart-line'}></i> */}

                {/* <Expand name={'Biểu đồ'} id='2' icon={'uil-chart-line'} show={show}>
                  <LinkComp>
                    {[
                      { url: '213', name: 'Xem biểu đồ' },
                      { url: '123', name: 'Cài đặt biểu đồ' }
                    ]}
                  </LinkComp>
                </Expand>
              </li> */}

              <li className={show ? 'side-nav-item' : 'menu-li'}>
                {/* <i className={active === 3 ? 'uil-chart-line icon-active' : 'uil-chart-line'}></i> */}

                <Expand name={'Biểu đồ'} id='2' icon={'uil-chart-line'} show={show}>
                  <LinkComp>
                    {[
                      { url: '/admin/excel', name: 'Excell' },
                      { url: '/admin/add-excel', name: 'Thêm dữ liệu' },
                    ]}
                  </LinkComp>
                </Expand>
              </li>
            </ul>
          </Accordion>

        </div>
      </div>
      <div className={show ? 'admin-page open' : 'admin-page'}>

        <div className='page-head-bg'>
          <div className='container-fluid' style={{ height: '100%' }}>
            <div className='page-head'>
              <div className='left'>
                <button onClick={() => setShow(!show)} className="me-2 button-toggle-menu">
                  <i className="mdi mdi-menu"></i>
                </button>
                {/* <OffCanvasExample option={options} show={show} setShow={setShow} /> */}
              </div>
              <div className='right'>
                <ul>
                  <li>
                    <UserDropDown userName={userName} removeCookie={removeCookie} />

                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='child-page'>
          <div className='container-fluid'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Admin;

