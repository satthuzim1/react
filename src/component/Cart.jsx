import { React, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormatVND } from "../js/format";
import { Count, Message } from '../layout/Context'
import { useCookies } from 'react-cookie'
import Image from 'react-bootstrap/Image';
import { getProduct, apiGetCities, apiGetDistrict, apiPostWard, apiGetWard, apiPostOrder, callApi } from '../js/api';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import img_th_true_milk from '../images/products/th-truemilk.png'
import cart_icon from '../images/flags/lc_shopping-cart.png'

export const Cart = () => {
    const [cookies] = useCookies(['cart']);
    const { value, updateCountValue } = useContext(Count);

    useEffect(() => {
        // console.log(cookies.cart)
        cookies.cart && updateCountValue(Object.keys(cookies.cart).length)
    }, [cookies])

    return (
        <div className="header-action-item main-header--cart">
            <div className="header-action_text">
                <Link to={'cart'} className="header-action__link header-action_clicked" id="site-cart-handle" aria-label="Giỏ hàng" title="Giỏ hàng">
                    <span className="box-icon">
                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.22111 3L3.84216 1H1M4.22111 3H19L15.2105 12.0455H5.73689M4.22111 3L5.73689 12.0455M5.73689 12.0455L3.56458 13.293C2.96774 13.923 3.5309 14.9091 4.375 14.9091H9.625H12.25L15.2105 15M15.2105 15C14.708 15 14.2261 15.2107 13.8708 15.5858C13.5154 15.9609 13.3158 16.4696 13.3158 17C13.3158 17.5304 13.5154 18.0391 13.8708 18.4142C14.2261 18.7893 14.708 19 15.2105 19C15.7131 19 16.195 18.7893 16.5503 18.4142C16.9056 18.0391 17.1053 17.5304 17.1053 17C17.1053 16.4696 16.9056 15.9609 16.5503 15.5858C16.195 15.2107 15.7131 15 15.2105 15ZM7.63162 17C7.63162 17.5304 7.432 18.0391 7.07667 18.4142C6.72134 18.7893 6.2394 19 5.73689 19C5.23438 19 4.75245 18.7893 4.39711 18.4142C4.04178 18.0391 3.84216 17.5304 3.84216 17C3.84216 16.4696 4.04178 15.9609 4.39711 15.5858C4.75245 15.2107 5.23438 15 5.73689 15C6.2394 15 6.72134 15.2107 7.07667 15.5858C7.432 15.9609 7.63162 16.4696 7.63162 17Z"
                                stroke="white" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"></path>
                        </svg>
                        <span className="count-holder"><span className="count">{value}</span></span>
                    </span>
                    <span className="box-text">
                        <div className="txtnw">Giỏ</div>
                        <div className="txtbl">
                            <span className="txt-overflow">
                                <span>hàng</span>
                            </span>
                        </div>
                    </span>
                </Link>

                {/* <span className="box-triangle">
                    <svg viewBox="0 0 20 9" role="presentation">
                        <path
                            d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                            fill="#ffffff"></path>
                    </svg>
                </span> */}
            </div>

            {/* <div className="header-action_dropdown account-dropdown">
                <div className="header-dropdown-cover not-logged-account-dropdown">
                    <div className="greeting block--1">
                        <div className="thing">
                            <div className="thing-img">
                                <svg width="24" height="23" viewBox="0 0 24 23" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_102:3778)">
                                        <path
                                            d="M3.73909 2.42375L3.62936 2.8938C3.09762 5.15004 2.22365 7.41897 1.02676 9.63384C0.151328 11.2668 -0.175951 13.1255 0.0909153 14.9487C0.400975 17.0265 1.47017 18.9262 3.10282 20.3001C4.73546 21.6741 6.82234 22.4303 8.98149 22.4305H8.98777C10.169 22.4329 11.339 22.2072 12.4298 21.7666C13.5207 21.3259 14.5107 20.6791 15.3425 19.8635L17.1919 18.0604L22.9027 12.5275C23.1619 12.2758 23.3531 11.9658 23.4594 11.625C23.5657 11.2842 23.5838 10.9231 23.5121 10.5739C23.4403 10.2246 23.281 9.89804 23.0482 9.62309C22.8154 9.34815 22.5163 9.13338 22.1776 8.99786L21.9079 8.89069L23.1062 7.72779C23.3136 7.52718 23.4782 7.28876 23.5907 7.02619C23.7031 6.76361 23.7612 6.48205 23.7615 6.19762C23.7619 5.91319 23.7045 5.63148 23.5928 5.36864C23.481 5.1058 23.317 4.86699 23.1101 4.66589L23.0845 4.64097C22.772 4.33651 22.3727 4.13019 21.9384 4.04871L21.7527 4.0144L21.7885 3.83014C21.8143 3.69732 21.8274 3.56247 21.8277 3.4273C21.8282 3.14265 21.7706 2.86073 21.6582 2.59791C21.5457 2.33509 21.3807 2.09662 21.1727 1.89635L21.1408 1.86533C20.7932 1.52722 20.3402 1.31066 19.8526 1.24951C19.365 1.18836 18.8703 1.28607 18.4458 1.52736L18.2467 1.64065L18.1689 1.42912C18.0577 1.13684 17.8826 0.871558 17.6555 0.651661L17.6342 0.630038C17.2172 0.224597 16.6517 -0.00317383 16.062 -0.00317383C15.4723 -0.00317383 14.9068 0.224597 14.4898 0.630038L7.54388 7.38653L8.50776 3.51426C8.58622 3.20813 8.60136 2.88988 8.55231 2.57801C8.50325 2.26614 8.39097 1.96685 8.22199 1.69751C8.05301 1.42818 7.8307 1.19417 7.56795 1.00906C7.3052 0.823961 7.00726 0.691452 6.69142 0.619232C6.37558 0.547012 6.04813 0.536518 5.72808 0.58836C5.40804 0.640203 5.10177 0.753348 4.82706 0.921228C4.55235 1.08911 4.31467 1.30838 4.12782 1.56631C3.94097 1.82424 3.80867 2.11569 3.7386 2.42375H3.73909ZM5.48172 1.79999C5.64955 1.70979 5.83543 1.65592 6.02665 1.64204C6.21788 1.62817 6.40992 1.65463 6.58966 1.71961C6.9019 1.82981 7.16136 2.04815 7.31834 2.33281C7.47533 2.61747 7.5188 2.94843 7.44043 3.26232L6.01442 8.98846C5.94626 9.22349 6.09708 9.45851 6.28077 9.57038C6.3818 9.63055 6.64766 9.74195 6.94157 9.48295L15.2666 1.38776C15.3708 1.28587 15.4948 1.20511 15.6314 1.15017C15.768 1.09522 15.9144 1.06717 16.0622 1.06765C16.2098 1.0672 16.356 1.09517 16.4924 1.14995C16.6288 1.20473 16.7527 1.28523 16.8569 1.38682L16.8777 1.4075C17.0885 1.61275 17.2068 1.89093 17.2068 2.18097C17.2068 2.471 17.0885 2.74918 16.8777 2.95443L11.76 7.93085C11.661 8.03182 11.6065 8.16644 11.6082 8.30596C11.6098 8.44548 11.6676 8.57883 11.769 8.67752C11.8704 8.77621 12.0075 8.83242 12.151 8.83413C12.2945 8.83585 12.433 8.78293 12.5368 8.68669L18.7726 2.62305C18.877 2.52142 19.001 2.44079 19.1375 2.38578C19.274 2.33077 19.4203 2.30246 19.568 2.30246C19.7158 2.30246 19.8621 2.33077 19.9986 2.38578C20.1351 2.44079 20.259 2.52142 20.3635 2.62305L20.3992 2.65125C20.5039 2.75292 20.5869 2.87364 20.6435 3.00652C20.7001 3.1394 20.7293 3.28182 20.7293 3.42566C20.7293 3.5695 20.7001 3.71192 20.6435 3.8448C20.5869 3.97768 20.5039 4.0984 20.3992 4.20007L18.7267 5.81986C17.1823 7.31556 15.4802 8.96355 14.1465 10.2562C14.0917 10.3047 14.0476 10.3635 14.0168 10.4291C13.9859 10.4947 13.9691 10.5656 13.9673 10.6377C13.9654 10.7098 13.9786 10.7815 14.006 10.8484C14.0334 10.9154 14.0745 10.9763 14.1267 11.0274C14.179 11.0786 14.2413 11.1189 14.31 11.146C14.3788 11.173 14.4524 11.1863 14.5265 11.1849C14.6006 11.1836 14.6737 11.1676 14.7413 11.1381C14.809 11.1085 14.8697 11.066 14.92 11.013L14.9238 11.0092C16.1662 9.80588 19.5369 6.54091 20.7212 5.3954C20.9324 5.19126 21.2181 5.07668 21.5159 5.07668C21.8137 5.07668 22.0994 5.19126 22.3106 5.3954L22.3362 5.42032C22.4413 5.52196 22.5247 5.64281 22.5816 5.77591C22.6386 5.90902 22.6679 6.05175 22.6679 6.1959C22.6679 6.34005 22.6386 6.48278 22.5816 6.61588C22.5247 6.74898 22.4413 6.86983 22.3362 6.97148L21.5662 7.71745C19.7858 9.43877 17.4278 11.7232 15.8752 13.2274C15.7722 13.3276 15.7144 13.4634 15.7144 13.6051C15.7144 13.7467 15.7722 13.8825 15.8752 13.9827C15.9261 14.0324 15.9867 14.0718 16.0533 14.0987C16.12 14.1256 16.1914 14.1394 16.2636 14.1394C16.3357 14.1394 16.4072 14.1256 16.4738 14.0987C16.5405 14.0718 16.601 14.0324 16.652 13.9827L20.0575 10.6835L20.5409 10.2172C20.7525 10.0144 21.038 9.90098 21.3352 9.90168C21.6323 9.90239 21.9172 10.0171 22.1279 10.2209C22.3388 10.4263 22.4572 10.7046 22.4572 10.9949C22.4572 11.2851 22.3388 11.5635 22.1279 11.7688L16.4151 17.3051L14.5647 19.1091C13.8347 19.8249 12.9658 20.3927 12.0083 20.7794C11.0509 21.1662 10.024 21.3642 8.98729 21.3621H8.98149C7.08659 21.3618 5.25514 20.698 3.82228 19.4923C2.38941 18.2865 1.45093 16.6194 1.17855 14.7959C0.943867 13.1952 1.23127 11.5633 2.00032 10.1297C3.24167 7.83261 4.15045 5.47625 4.70152 3.13023L4.81125 2.66018C4.85293 2.4784 4.93439 2.30747 5.05008 2.15904C5.16578 2.01061 5.313 1.88815 5.48172 1.79999Z"
                                            fill="black"></path>
                                        <path
                                            d="M21.9702 17.1911C21.9299 17.0929 21.8606 17.0086 21.7709 16.9487C21.6813 16.8889 21.5754 16.8563 21.4667 16.855C21.358 16.8538 21.2513 16.8839 21.1602 16.9417C21.0692 16.9994 20.9978 17.0821 20.9551 17.1794C20.6669 17.8309 20.2407 18.416 19.7043 18.8965C19.1679 19.377 18.5333 19.7422 17.842 19.9682C17.7735 19.9904 17.7101 20.0255 17.6555 20.0715C17.6009 20.1175 17.5561 20.1735 17.5238 20.2364C17.4914 20.2992 17.4721 20.3676 17.467 20.4377C17.4618 20.5078 17.4709 20.5781 17.4937 20.6448C17.5166 20.7115 17.5527 20.7731 17.6 20.8262C17.6473 20.8793 17.7049 20.9228 17.7695 20.9543C17.8341 20.9857 17.9045 21.0045 17.9766 21.0095C18.0486 21.0145 18.121 21.0057 18.1896 20.9835C19.0285 20.7097 19.7985 20.2667 20.4492 19.6835C21.0999 19.1002 21.6165 18.39 21.9654 17.5991C21.9939 17.5348 22.009 17.4656 22.0098 17.3956C22.0106 17.3256 21.9972 17.2561 21.9702 17.1911Z"
                                            fill="black"></path>
                                        <path
                                            d="M23.6674 17.8925C23.599 17.8641 23.5253 17.8494 23.4509 17.8492C23.3434 17.8495 23.2384 17.8802 23.1487 17.9378C23.0591 17.9953 22.9887 18.0771 22.9462 18.1731C22.559 19.0467 21.9916 19.8337 21.2791 20.4856C20.5666 21.1375 19.7243 21.6403 18.804 21.9631C18.7361 21.9868 18.6737 22.0232 18.6203 22.0704C18.5669 22.1175 18.5235 22.1744 18.4928 22.2378C18.462 22.3012 18.4443 22.3699 18.4408 22.44C18.4373 22.51 18.4481 22.5801 18.4724 22.6461C18.4968 22.7121 18.5342 22.7728 18.5827 22.8248C18.6312 22.8767 18.6897 22.9188 18.7549 22.9488C18.8201 22.9787 18.8908 22.9959 18.9628 22.9993C19.0349 23.0027 19.1069 22.9922 19.1748 22.9686C20.2368 22.5961 21.2089 22.0158 22.031 21.2634C22.853 20.511 23.5076 19.6025 23.9541 18.5943C24.0114 18.4642 24.0134 18.3174 23.9597 18.1859C23.906 18.0544 23.8009 17.9489 23.6674 17.8925Z"
                                            fill="black"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_102:3778">
                                            <rect width="24" height="23" fill="white"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="thing-name">Xin chào, vui lòng đăng nhập</div>
                            </div>
                        </div>
                        <div className="actions">
                            <button className="js-account" data-box="acc-login-box">ĐĂNG NHẬP</button>
                            <button className="js-account" data-box="acc-register-box">ĐĂNG KÝ</button>
                        </div>
                    </div>
                    <div className="block block--3">
                        <ul>
                            <li><a href="/pages/faq" className="thing">
                                <div className="thing-img">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10 0C4.47305 0 0 4.47266 0 10C0 15.5273 4.47266 20 10 20C15.5273 20 20 15.5273 20 10C20 4.47266 15.5273 0 10 0ZM10 18.6047C5.25547 18.6047 1.39531 14.7445 1.39531 10C1.39531 5.25547 5.25547 1.39531 10 1.39531C14.7445 1.39531 18.6047 5.25547 18.6047 10C18.6047 14.7445 14.7445 18.6047 10 18.6047Z"
                                            fill="black"></path>
                                        <path
                                            d="M9.7045 12.6531C9.43777 12.656 9.18298 12.7641 8.99561 12.954C8.80824 13.1438 8.70347 13.4 8.7041 13.6667C8.7041 14.2066 9.13809 14.6804 9.7045 14.6804C9.96247 14.6644 10.2046 14.5506 10.3816 14.3623C10.5586 14.1739 10.6572 13.9252 10.6572 13.6667C10.6572 13.4083 10.5586 13.1595 10.3816 12.9712C10.2046 12.7829 9.96247 12.6691 9.7045 12.6531Z"
                                            fill="black"></path>
                                        <path
                                            d="M9.87519 4.97937C8.09824 4.97937 7.28223 6.03406 7.28223 6.74304C7.28223 7.25671 7.7166 7.49343 8.07207 7.49343C8.783 7.49343 8.49316 6.47781 9.83574 6.47781C10.4939 6.47781 11.0205 6.76765 11.0205 7.37312C11.0205 8.08406 10.2834 8.49187 9.84863 8.86062C9.46699 9.18953 8.9666 9.72937 8.9666 10.8614C8.9666 11.5458 9.15097 11.743 9.69081 11.743C10.3357 11.743 10.4674 11.4536 10.4674 11.2036C10.4674 10.5188 10.4803 10.1243 11.2045 9.55828C11.5599 9.28171 12.6787 8.3864 12.6787 7.14929C12.6787 5.91218 11.5603 4.97937 9.87519 4.97937Z"
                                            fill="black"></path>
                                    </svg>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="thing-name">Trợ giúp</div>
                                </div>
                            </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
function ItemQuantity(props) {
    // Khởi tạo state để lưu trữ giá trị của input
    const [quantity, setQuantity] = useState(props.quantity);
useEffect(()=>{props.calculateTotal()},[quantity])

    // Hàm xử lý sự kiện khi nhấn nút "+"
    const handleIncrement = () => {
        setQuantity(quantity + 1);


        let updatedCart = { ...props.cookies.cart };
        if (updatedCart[props.verId]) {
            updatedCart[props.verId].quantity += 1;
        }
        props.updateCookie(updatedCart);
    };

    // Hàm xử lý sự kiện khi nhấn nút "-"
    const handleDecrement = () => {
        // Đảm bảo giá trị không bị âm
        if (quantity > 1) {
            setQuantity(quantity - 1);

            let updatedCart = { ...props.cookies.cart };

            if (updatedCart[props.verId]) {
                updatedCart[props.verId].quantity -= 1;
            }
            props.updateCookie(updatedCart);
        }
    };

    return (
        <>
            <button onClick={handleDecrement} type="button" className="qtyminus qty-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3332 8H7.99984H2.6665" stroke="#111111" strokeWidth="2" strokeLinecap="round">
                </path>
                </svg>
            </button>
            <input readOnly type="text" min="1" value={quantity} className="tc line-item-qty item-quantity" />
            <button onClick={handleIncrement} type="button" className="qtyplus qty-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00033 13.3334V8.00008M8.00033 8.00008V2.66675M8.00033 8.00008H13.3337M8.00033 8.00008H2.66699" stroke="#111111" strokeWidth="2" strokeLinecap="round">
                </path>
                </svg>
            </button>
        </>
    );
}

function DeleteItem(props) {
    const deleteItem = (e) => {
        e.preventDefault()

        delete props.cookies.cart[props.product_version]
        props.updateCookie(props.cookies.cart)
        Object.keys(props.cookies.cart).length === 0 && props.setCart([])
        props.refreshData()
    }
    return (
        <div className="left">
            <div className="item-img">
                <img src={img_th_true_milk} alt="PC GVN x MSI PROJECT ZERO WHITE (Intel i5-14400F/ VGA RTX 4060)" />
            </div>
            <Link className="a-tag" onClick={deleteItem} >
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.58036 11.75H10.1696C10.317 11.75 10.4643 11.6328 10.4643 11.4688V6.40625C10.4643 6.26563 10.317 6.125 10.1696 6.125H9.58036C9.40848 6.125 9.28571 6.26563 9.28571 6.40625V11.4688C9.28571 11.6328 9.40848 11.75 9.58036 11.75ZM13.6071 3.875H11.5692L10.7344 2.5625C10.5379 2.23438 10.1451 2 9.72768 2H7.24777C6.83036 2 6.4375 2.23438 6.24107 2.5625L5.40625 3.875H3.39286C3.17188 3.875 3 4.0625 3 4.25V4.625C3 4.83594 3.17188 5 3.39286 5H3.78571V12.875C3.78571 13.5078 4.30134 14 4.96429 14H12.0357C12.6741 14 13.2143 13.5078 13.2143 12.875V5H13.6071C13.8036 5 14 4.83594 14 4.625V4.25C14 4.0625 13.8036 3.875 13.6071 3.875ZM7.19866 3.19531C7.22321 3.17188 7.27232 3.125 7.32143 3.125C7.32143 3.125 7.32143 3.125 7.34598 3.125H9.65402C9.70313 3.125 9.75223 3.17188 9.77679 3.19531L10.1942 3.875H6.78125L7.19866 3.19531ZM12.0357 12.875H4.96429V5H12.0357V12.875ZM6.83036 11.75H7.41964C7.56696 11.75 7.71429 11.6328 7.71429 11.4688V6.40625C7.71429 6.26563 7.56696 6.125 7.41964 6.125H6.83036C6.65848 6.125 6.53571 6.26563 6.53571 6.40625V11.4688C6.53571 11.6328 6.65848 11.75 6.83036 11.75Z"
                        fill="#6D6E72">
                    </path>
                </svg>
                Xoá
            </Link>
        </div>
    )
}
function StepOne(props) {

    return (
        <>
            {props.cart && props.cart.length > 0 ? (<>
                <section className="section-steps">
                    <div className="checkout-step status-one is-active" data-box="cart-buy-order-box">
                        <div className="icon">
                            <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14.5215" cy="14" r="14" fill="#E30019"></circle>
                                <path
                                    d="M21.4353 10.9187C21.3355 10.8254 21.2167 10.7514 21.0859 10.7009C20.9551 10.6505 20.8147 10.6247 20.6731 10.625H18.5192V10.125C18.5192 9.19674 18.1221 8.3065 17.4152 7.65013C16.7084 6.99375 15.7497 6.625 14.75 6.625C13.7503 6.625 12.7916 6.99375 12.0848 7.65013C11.3779 8.3065 10.9808 9.19674 10.9808 10.125V10.625H8.82692C8.54131 10.625 8.26739 10.7304 8.06542 10.9179C7.86346 11.1054 7.75 11.3598 7.75 11.625V18.375C7.75 19.5937 8.86058 20.625 10.1731 20.625H19.3269C19.9618 20.6252 20.5715 20.3947 21.0258 19.9828C21.2543 19.7803 21.4364 19.5369 21.5608 19.2673C21.6853 18.9977 21.7497 18.7074 21.75 18.4141V11.625C21.7504 11.4938 21.7228 11.3638 21.6688 11.2426C21.6148 11.1214 21.5355 11.0113 21.4353 10.9187ZM17.3242 14.1875L14.3088 17.6875C14.2593 17.745 14.1967 17.7915 14.1256 17.824C14.0544 17.8564 13.9764 17.8738 13.8972 17.875H13.8885C13.8107 17.875 13.7338 17.8594 13.6632 17.8292C13.5925 17.7989 13.5298 17.7549 13.4792 17.7L12.1869 16.2975C12.141 16.2476 12.106 16.1898 12.0841 16.1273C12.0622 16.0649 12.0538 15.9991 12.0593 15.9336C12.0648 15.8681 12.0841 15.8043 12.1162 15.7458C12.1482 15.6873 12.1924 15.6352 12.2462 15.5925C12.2999 15.5498 12.3622 15.5174 12.4294 15.4971C12.4966 15.4767 12.5675 15.4689 12.638 15.474C12.7085 15.4791 12.7773 15.497 12.8403 15.5268C12.9033 15.5566 12.9594 15.5976 13.0054 15.6475L13.875 16.5909L16.4835 13.5625C16.5728 13.4589 16.7027 13.3925 16.8447 13.3778C16.9867 13.3632 17.1291 13.4015 17.2407 13.4844C17.3523 13.5673 17.4238 13.6879 17.4396 13.8198C17.4554 13.9516 17.4141 14.0839 17.3249 14.1875H17.3242ZM17.4423 10.625H12.0577V10.125C12.0577 9.46196 12.3413 8.82607 12.8462 8.35723C13.3512 7.88839 14.036 7.625 14.75 7.625C15.464 7.625 16.1488 7.88839 16.6537 8.35723C17.1587 8.82607 17.4423 9.46196 17.4423 10.125V10.625Z"
                                    fill="white"></path>
                            </svg>
                        </div>
                        <div className="text"><span>Giỏ hàng</span></div>
                    </div>
                    <div className="checkout-step status-two" data-box="cart-info-order-box">
                        <div className="icon">
                            <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14.4009" cy="14" r="13.5" stroke="#535353"></circle>
                                <path
                                    d="M20.0009 9H8.80088C8.02878 9 7.40088 9.56062 7.40088 10.25V17.75C7.40088 18.4394 8.02878 19 8.80088 19H20.0009C20.773 19 21.4009 18.4394 21.4009 17.75V10.25C21.4009 9.56062 20.773 9 20.0009 9ZM12.1014 11.5C12.9071 11.5 13.5014 12.0306 13.5014 12.75C13.5014 13.4694 12.9071 14 12.1014 14C11.2957 14 10.7014 13.4694 10.7014 12.75C10.7014 12.0306 11.295 11.5 12.1014 11.5ZM14.7019 16.5H9.50088V16.2094C9.50088 15.3512 10.6741 14.4688 12.1014 14.4688C13.5287 14.4688 14.7019 15.3512 14.7019 16.2094V16.5ZM19.3009 15.875H16.5009V14.625H19.3009V15.875ZM19.3009 13.375H15.8009V12.125H19.3009V13.375Z"
                                    fill="#535353"></path>
                            </svg>
                        </div>
                        <div className="text"><span>Thông tin đặt hàng</span></div>
                    </div>
                    <div className="checkout-step status-three" data-box="cart-payment-order-box">
                        <div className="icon">
                            <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14.1709" cy="14" r="13.5" stroke="#535353"></circle>
                                <path
                                    d="M7.16553 10.6667C7.16553 10.2246 7.34987 9.80072 7.678 9.48816C8.00614 9.17559 8.45118 9 8.91523 9H19.4134C19.8775 9 20.3225 9.17559 20.6507 9.48816C20.9788 9.80072 21.1631 10.2246 21.1631 10.6667V11.5H7.16553V10.6667ZM7.16553 13.1667V17.3333C7.16553 17.7754 7.34987 18.1993 7.678 18.5118C8.00614 18.8244 8.45118 19 8.91523 19H19.4134C19.8775 19 20.3225 18.8244 20.6507 18.5118C20.9788 18.1993 21.1631 17.7754 21.1631 17.3333V13.1667H7.16553ZM9.79008 14.8333H10.6649C10.897 14.8333 11.1195 14.9211 11.2835 15.0774C11.4476 15.2337 11.5398 15.4457 11.5398 15.6667V16.5C11.5398 16.721 11.4476 16.933 11.2835 17.0893C11.1195 17.2455 10.897 17.3333 10.6649 17.3333H9.79008C9.55805 17.3333 9.33553 17.2455 9.17147 17.0893C9.0074 16.933 8.91523 16.721 8.91523 16.5V15.6667C8.91523 15.4457 9.0074 15.2337 9.17147 15.0774C9.33553 14.9211 9.55805 14.8333 9.79008 14.8333Z"
                                    fill="#535353"></path>
                            </svg>
                        </div>
                        <div className="text"><span>Xác nhận thông tin</span></div>
                    </div>
                    <div className="checkout-step status-four">
                        <div className="icon">
                            <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14.4321" cy="14" r="13.5" stroke="#535353"></circle>
                                <path
                                    d="M13.0988 17.1818L10.4321 14.6364L11.3721 13.7391L13.0988 15.3809L17.4921 11.1873L18.4321 12.0909M14.4321 7L8.43213 9.54545V13.3636C8.43213 16.8955 10.9921 20.1982 14.4321 21C17.8721 20.1982 20.4321 16.8955 20.4321 13.3636V9.54545L14.4321 7Z"
                                    fill="#535353"></path>
                            </svg>
                        </div>
                        <div className="text"><span>Hoàn tất</span></div>
                    </div>
                </section>
                <div className="item-list">
                    {props.cart.map(val => (
                        <div key={val.id} className="item">

                            <DeleteItem product_version={val.id} setCart={props.setCart} cookies={props.cookies} updateCookie={props.updateCookie} refreshData={props.refreshData} />

                            <div className='mid'>
                                <div className="item-name">
                                    {val.product_name}
                                </div>
                                <div className="item-variant">
                                    {val.attribute_name}
                                </div>
                            </div>
                            <div className="right">
                                <div className="old-price">
                                    {(val.compare_price > val.unit_price) && <span><FormatVND number={val.compare_price} /></span>}
                                </div>
                                <div className="new-price">
                                    <span><FormatVND number={val.unit_price} /></span>
                                </div>
                                <div className='size'>
                                    <div className="qty quantity-partent qty-click">
                                        <ItemQuantity calculateTotal={props.calculateTotal} verId={val.id} quantity={val.quantity} cart={props.cart} setCart={props.setCart} updateCookie={props.updateCookie} cookies={props.cookies} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="summary-total">
                    <span className="title">Tổng tiền:</span>
                    <span className="totalprice">
                        {/* total không được set trong state, nếu có lỗi cần xem lại */}
                        <FormatVND number={props.cost} />
                    </span>
                </div>
                <div className="summary-action none">
                    <Link className="btn-checkout button js-btn-checkout" data-box="cart-info-order-box">ĐẶT HÀNG NGAY</Link>
                </div></>)
                :
                (<div className='empty-cart'>
                    <p>Giỏ hàng của bạn đang trống</p>
                    <Link className='empty-cart-button' to={'/'}>Quay lại trang chủ</Link>
                </div>)}
        </>
    )
}
function StepTwo(props) {
    return (
        <>
            <section className="section-steps">
                <div className="checkout-step status-one is-active" data-box="cart-buy-order-box">
                    <div className="icon">
                        <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.5215" cy="14" r="14" fill="#E30019"></circle>
                            <path
                                d="M21.4353 10.9187C21.3355 10.8254 21.2167 10.7514 21.0859 10.7009C20.9551 10.6505 20.8147 10.6247 20.6731 10.625H18.5192V10.125C18.5192 9.19674 18.1221 8.3065 17.4152 7.65013C16.7084 6.99375 15.7497 6.625 14.75 6.625C13.7503 6.625 12.7916 6.99375 12.0848 7.65013C11.3779 8.3065 10.9808 9.19674 10.9808 10.125V10.625H8.82692C8.54131 10.625 8.26739 10.7304 8.06542 10.9179C7.86346 11.1054 7.75 11.3598 7.75 11.625V18.375C7.75 19.5937 8.86058 20.625 10.1731 20.625H19.3269C19.9618 20.6252 20.5715 20.3947 21.0258 19.9828C21.2543 19.7803 21.4364 19.5369 21.5608 19.2673C21.6853 18.9977 21.7497 18.7074 21.75 18.4141V11.625C21.7504 11.4938 21.7228 11.3638 21.6688 11.2426C21.6148 11.1214 21.5355 11.0113 21.4353 10.9187ZM17.3242 14.1875L14.3088 17.6875C14.2593 17.745 14.1967 17.7915 14.1256 17.824C14.0544 17.8564 13.9764 17.8738 13.8972 17.875H13.8885C13.8107 17.875 13.7338 17.8594 13.6632 17.8292C13.5925 17.7989 13.5298 17.7549 13.4792 17.7L12.1869 16.2975C12.141 16.2476 12.106 16.1898 12.0841 16.1273C12.0622 16.0649 12.0538 15.9991 12.0593 15.9336C12.0648 15.8681 12.0841 15.8043 12.1162 15.7458C12.1482 15.6873 12.1924 15.6352 12.2462 15.5925C12.2999 15.5498 12.3622 15.5174 12.4294 15.4971C12.4966 15.4767 12.5675 15.4689 12.638 15.474C12.7085 15.4791 12.7773 15.497 12.8403 15.5268C12.9033 15.5566 12.9594 15.5976 13.0054 15.6475L13.875 16.5909L16.4835 13.5625C16.5728 13.4589 16.7027 13.3925 16.8447 13.3778C16.9867 13.3632 17.1291 13.4015 17.2407 13.4844C17.3523 13.5673 17.4238 13.6879 17.4396 13.8198C17.4554 13.9516 17.4141 14.0839 17.3249 14.1875H17.3242ZM17.4423 10.625H12.0577V10.125C12.0577 9.46196 12.3413 8.82607 12.8462 8.35723C13.3512 7.88839 14.036 7.625 14.75 7.625C15.464 7.625 16.1488 7.88839 16.6537 8.35723C17.1587 8.82607 17.4423 9.46196 17.4423 10.125V10.625Z"
                                fill="white"></path>
                        </svg>
                    </div>
                    <div className="text"><span>Giỏ hàng</span></div>
                </div>
                <div className="checkout-step status-two is-active" data-box="cart-info-order-box">
                    <div className="icon">
                        <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.4009" cy="14" r="13.5" fill="#E30019"></circle>
                            <path
                                d="M20.0009 9H8.80088C8.02878 9 7.40088 9.56062 7.40088 10.25V17.75C7.40088 18.4394 8.02878 19 8.80088 19H20.0009C20.773 19 21.4009 18.4394 21.4009 17.75V10.25C21.4009 9.56062 20.773 9 20.0009 9ZM12.1014 11.5C12.9071 11.5 13.5014 12.0306 13.5014 12.75C13.5014 13.4694 12.9071 14 12.1014 14C11.2957 14 10.7014 13.4694 10.7014 12.75C10.7014 12.0306 11.295 11.5 12.1014 11.5ZM14.7019 16.5H9.50088V16.2094C9.50088 15.3512 10.6741 14.4688 12.1014 14.4688C13.5287 14.4688 14.7019 15.3512 14.7019 16.2094V16.5ZM19.3009 15.875H16.5009V14.625H19.3009V15.875ZM19.3009 13.375H15.8009V12.125H19.3009V13.375Z"
                                fill="white"></path>
                        </svg>
                    </div>
                    <div className="text"><span>Thông tin đặt hàng</span></div>
                </div>
                <div className="checkout-step status-three" data-box="cart-payment-order-box">
                    <div className="icon">
                        <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.1709" cy="14" r="13.5" stroke="#535353"></circle>
                            <path
                                d="M7.16553 10.6667C7.16553 10.2246 7.34987 9.80072 7.678 9.48816C8.00614 9.17559 8.45118 9 8.91523 9H19.4134C19.8775 9 20.3225 9.17559 20.6507 9.48816C20.9788 9.80072 21.1631 10.2246 21.1631 10.6667V11.5H7.16553V10.6667ZM7.16553 13.1667V17.3333C7.16553 17.7754 7.34987 18.1993 7.678 18.5118C8.00614 18.8244 8.45118 19 8.91523 19H19.4134C19.8775 19 20.3225 18.8244 20.6507 18.5118C20.9788 18.1993 21.1631 17.7754 21.1631 17.3333V13.1667H7.16553ZM9.79008 14.8333H10.6649C10.897 14.8333 11.1195 14.9211 11.2835 15.0774C11.4476 15.2337 11.5398 15.4457 11.5398 15.6667V16.5C11.5398 16.721 11.4476 16.933 11.2835 17.0893C11.1195 17.2455 10.897 17.3333 10.6649 17.3333H9.79008C9.55805 17.3333 9.33553 17.2455 9.17147 17.0893C9.0074 16.933 8.91523 16.721 8.91523 16.5V15.6667C8.91523 15.4457 9.0074 15.2337 9.17147 15.0774C9.33553 14.9211 9.55805 14.8333 9.79008 14.8333Z"
                                fill="#535353"></path>
                        </svg>
                    </div>
                    <div className="text"><span>Xác nhận thông tin</span></div>
                </div>
                <div className="checkout-step status-four">
                    <div className="icon">
                        <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.4321" cy="14" r="13.5" stroke="#535353"></circle>
                            <path
                                d="M13.0988 17.1818L10.4321 14.6364L11.3721 13.7391L13.0988 15.3809L17.4921 11.1873L18.4321 12.0909M14.4321 7L8.43213 9.54545V13.3636C8.43213 16.8955 10.9921 20.1982 14.4321 21C17.8721 20.1982 20.4321 16.8955 20.4321 13.3636V9.54545L14.4321 7Z"
                                fill="#535353"></path>
                        </svg>
                    </div>
                    <div className="text"><span>Hoàn tất</span></div>
                </div>
            </section>
            <div className='container-fluid'>
                <div className='cart-info'>Thông tin khách mua hàng</div>
                <Form id="userInfo" className='mb-3'>
                    <div className='row mt-2'>
                        <div className='col-6'>
                            <div key={`inline-radio`}>
                                <Form.Check
                                    inline
                                    label="Anh"
                                    name="gender"
                                    type='radio'
                                    id="inline-radio-1"
                                    value={1}
                                    checked={props.orderData.gender == 1}
                                    onChange={e => props.updateOrderData('gender', e.target)}
                                />
                                <Form.Check
                                    inline
                                    label="Chị"
                                    name="gender"
                                    type='radio'
                                    id="inline-radio-2"
                                    value={0}
                                    checked={props.orderData.gender == 0}
                                    onChange={e => props.updateOrderData('gender', e.target)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className="col-6">
                            <label htmlFor='name'>Họ tên</label>
                            <input type='text' id='name' name='name' className='form-control' onChange={e => props.updateOrderData('name', e.target)} defaultValue={props.orderData.name} />
                        </div>
                        <div className="col-6">
                            <label htmlFor='phone_number'>Số điện thoại</label>
                            <input type='text' id='phone_number' name='phone_number' className='form-control' onChange={e => props.updateOrderData('phone_number', e.target)} defaultValue={props.orderData.phone_number} />
                        </div>
                    </div>
                    <div className='cart-info mt-3'>Địa chỉ nhận hàng</div>
                    <Form.Check
                        className='mt-2'
                        inline
                        defaultChecked
                        label="Giao hàng tận nơi"
                        name="group2"
                        type='radio'
                        id="inline-radio-3"
                    />
                    <div className='row mt-2'>
                        <div className='col-6'>
                            <Select
                                className="basic-single"
                                classNamePrefix="form-control"
                                isDisabled={false}
                                isLoading={false}
                                isClearable
                                isRtl={false}
                                isSearchable={true}
                                // name="color"
                                options={props.cities}
                                name='city'
                                value={props.selectedCity}
                                onChange={e => props.updateOrderData('city', e)}
                            />
                        </div>
                        <div className='col-6'>
                            <Select
                                className="basic-single"
                                classNamePrefix="form-control"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={true}
                                // name="color"
                                options={props.districts}
                                name='district'
                                value={props.selectedDistrict}
                                onChange={e => props.updateOrderData('district', e)}
                            />
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-6'>
                            <Select
                                className="basic-single"
                                classNamePrefix="form-control"
                                // defaultValue={props.colourOptions[0]}
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={true}
                                // name="color"
                                options={props.wards}
                                name='ward'
                                value={props.selectedWard}
                                onChange={e => props.updateOrderData('ward', e)}
                            />
                        </div>
                        <div className='col-6'>
                            <input type='text' name='street' className='form-control' placeholder='Số nhà, tên đường' onChange={e => props.updateOrderData('street', e.target)} defaultValue={props.orderData.street} />
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-12'>
                            <FloatingLabel controlId="floatingTextarea2" label="Lưu ý, yêu cầu khác (không bắt buộc)">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Để lại lưu ý ở đây nếu có"
                                    style={{ height: '300px' }}
                                    onChange={e => props.updateOrderData('note', e.target)}
                                    defaultValue={props.orderData.note}
                                />
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='cart-info mt-3'>Dịch vụ giao hàng</div>
                    <Form.Check
                        inline
                        className='mt-2'
                        defaultChecked
                        label="Giao hàng tiêu chuẩn"
                        name="group3"
                        type='radio'
                        id={`inline-radio-4`}
                    />
                    <div className='cart-info mt-3'>Cách thức thanh toán</div>
                    <Form.Check
                        inline
                        className='mt-2'
                        defaultChecked
                        label="Thanh toán khi nhận hàng"
                        name="group4"
                        type='radio'
                        id={`inline-radio-5`}
                    />
                </Form>
                <div className="summary-total">
                    <span className="title">Tổng tiền:</span>
                    <span className="totalprice">
                        {/* total không được set trong state, nếu có lỗi cần xem lại */}
                        <FormatVND number={props.cost} />
                    </span>
                </div>
            </div>
        </>
    )
}
function StepThree(props) {
    let confirmOrderInfo = props.confirmOrderInfo
    return (
        <>
            <section className="section-steps">
                <div className="checkout-step status-one is-active" data-box="cart-buy-order-box">
                    <div className="icon">
                        <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.5215" cy="14" r="14" fill="#E30019"></circle>
                            <path
                                d="M21.4353 10.9187C21.3355 10.8254 21.2167 10.7514 21.0859 10.7009C20.9551 10.6505 20.8147 10.6247 20.6731 10.625H18.5192V10.125C18.5192 9.19674 18.1221 8.3065 17.4152 7.65013C16.7084 6.99375 15.7497 6.625 14.75 6.625C13.7503 6.625 12.7916 6.99375 12.0848 7.65013C11.3779 8.3065 10.9808 9.19674 10.9808 10.125V10.625H8.82692C8.54131 10.625 8.26739 10.7304 8.06542 10.9179C7.86346 11.1054 7.75 11.3598 7.75 11.625V18.375C7.75 19.5937 8.86058 20.625 10.1731 20.625H19.3269C19.9618 20.6252 20.5715 20.3947 21.0258 19.9828C21.2543 19.7803 21.4364 19.5369 21.5608 19.2673C21.6853 18.9977 21.7497 18.7074 21.75 18.4141V11.625C21.7504 11.4938 21.7228 11.3638 21.6688 11.2426C21.6148 11.1214 21.5355 11.0113 21.4353 10.9187ZM17.3242 14.1875L14.3088 17.6875C14.2593 17.745 14.1967 17.7915 14.1256 17.824C14.0544 17.8564 13.9764 17.8738 13.8972 17.875H13.8885C13.8107 17.875 13.7338 17.8594 13.6632 17.8292C13.5925 17.7989 13.5298 17.7549 13.4792 17.7L12.1869 16.2975C12.141 16.2476 12.106 16.1898 12.0841 16.1273C12.0622 16.0649 12.0538 15.9991 12.0593 15.9336C12.0648 15.8681 12.0841 15.8043 12.1162 15.7458C12.1482 15.6873 12.1924 15.6352 12.2462 15.5925C12.2999 15.5498 12.3622 15.5174 12.4294 15.4971C12.4966 15.4767 12.5675 15.4689 12.638 15.474C12.7085 15.4791 12.7773 15.497 12.8403 15.5268C12.9033 15.5566 12.9594 15.5976 13.0054 15.6475L13.875 16.5909L16.4835 13.5625C16.5728 13.4589 16.7027 13.3925 16.8447 13.3778C16.9867 13.3632 17.1291 13.4015 17.2407 13.4844C17.3523 13.5673 17.4238 13.6879 17.4396 13.8198C17.4554 13.9516 17.4141 14.0839 17.3249 14.1875H17.3242ZM17.4423 10.625H12.0577V10.125C12.0577 9.46196 12.3413 8.82607 12.8462 8.35723C13.3512 7.88839 14.036 7.625 14.75 7.625C15.464 7.625 16.1488 7.88839 16.6537 8.35723C17.1587 8.82607 17.4423 9.46196 17.4423 10.125V10.625Z"
                                fill="white"></path>
                        </svg>
                    </div>
                    <div className="text"><span>Giỏ hàng</span></div>
                </div>
                <div className="checkout-step status-two is-active" data-box="cart-info-order-box">
                    <div className="icon">
                        <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.4009" cy="14" r="13.5" fill="#E30019"></circle>
                            <path
                                d="M20.0009 9H8.80088C8.02878 9 7.40088 9.56062 7.40088 10.25V17.75C7.40088 18.4394 8.02878 19 8.80088 19H20.0009C20.773 19 21.4009 18.4394 21.4009 17.75V10.25C21.4009 9.56062 20.773 9 20.0009 9ZM12.1014 11.5C12.9071 11.5 13.5014 12.0306 13.5014 12.75C13.5014 13.4694 12.9071 14 12.1014 14C11.2957 14 10.7014 13.4694 10.7014 12.75C10.7014 12.0306 11.295 11.5 12.1014 11.5ZM14.7019 16.5H9.50088V16.2094C9.50088 15.3512 10.6741 14.4688 12.1014 14.4688C13.5287 14.4688 14.7019 15.3512 14.7019 16.2094V16.5ZM19.3009 15.875H16.5009V14.625H19.3009V15.875ZM19.3009 13.375H15.8009V12.125H19.3009V13.375Z"
                                fill="white"></path>
                        </svg>
                    </div>
                    <div className="text"><span>Thông tin đặt hàng</span></div>
                </div>
                <div className="checkout-step status-three is-active" data-box="cart-payment-order-box">
                    <div className="icon">
                        <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.1709" cy="14" r="13.5" fill="#E30019"></circle>
                            <path
                                d="M7.16553 10.6667C7.16553 10.2246 7.34987 9.80072 7.678 9.48816C8.00614 9.17559 8.45118 9 8.91523 9H19.4134C19.8775 9 20.3225 9.17559 20.6507 9.48816C20.9788 9.80072 21.1631 10.2246 21.1631 10.6667V11.5H7.16553V10.6667ZM7.16553 13.1667V17.3333C7.16553 17.7754 7.34987 18.1993 7.678 18.5118C8.00614 18.8244 8.45118 19 8.91523 19H19.4134C19.8775 19 20.3225 18.8244 20.6507 18.5118C20.9788 18.1993 21.1631 17.7754 21.1631 17.3333V13.1667H7.16553ZM9.79008 14.8333H10.6649C10.897 14.8333 11.1195 14.9211 11.2835 15.0774C11.4476 15.2337 11.5398 15.4457 11.5398 15.6667V16.5C11.5398 16.721 11.4476 16.933 11.2835 17.0893C11.1195 17.2455 10.897 17.3333 10.6649 17.3333H9.79008C9.55805 17.3333 9.33553 17.2455 9.17147 17.0893C9.0074 16.933 8.91523 16.721 8.91523 16.5V15.6667C8.91523 15.4457 9.0074 15.2337 9.17147 15.0774C9.33553 14.9211 9.55805 14.8333 9.79008 14.8333Z"
                                fill="white"></path>
                        </svg>
                    </div>
                    <div className="text"><span>Xác nhận thông tin</span></div>
                </div>
                <div className="checkout-step status-four">
                    <div className="icon">
                        <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.4321" cy="14" r="13.5" stroke="#535353"></circle>
                            <path
                                d="M13.0988 17.1818L10.4321 14.6364L11.3721 13.7391L13.0988 15.3809L17.4921 11.1873L18.4321 12.0909M14.4321 7L8.43213 9.54545V13.3636C8.43213 16.8955 10.9921 20.1982 14.4321 21C17.8721 20.1982 20.4321 16.8955 20.4321 13.3636V9.54545L14.4321 7Z"
                                fill="#535353"></path>
                        </svg>
                    </div>
                    <div className="text"><span>Hoàn tất</span></div>
                </div>
            </section>
            <div className='container-fluid'>
                <div className='cart-info'>Xác nhận thông tin giao hàng</div>
                <div>
                    Tên người nhận: {confirmOrderInfo.gender} {confirmOrderInfo.name} <br></br>
                    Số điện thoại: {confirmOrderInfo.phone_number}<br></br>
                    Địa chỉ nhận hàng: {confirmOrderInfo.street}, {confirmOrderInfo.ward}, {confirmOrderInfo.district}, {confirmOrderInfo.city}
                </div>
            </div>
        </>
    )
}
function StepFour(props) {
    useEffect(() => {
        props.handleSubmit()
    }, [])

    return (
        <>
            <section className="section-steps">
                <div className="checkout-step status-one is-active" data-box="cart-buy-order-box">
                    <div className="icon">
                        <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.5215" cy="14" r="14" fill="#E30019"></circle>
                            <path
                                d="M21.4353 10.9187C21.3355 10.8254 21.2167 10.7514 21.0859 10.7009C20.9551 10.6505 20.8147 10.6247 20.6731 10.625H18.5192V10.125C18.5192 9.19674 18.1221 8.3065 17.4152 7.65013C16.7084 6.99375 15.7497 6.625 14.75 6.625C13.7503 6.625 12.7916 6.99375 12.0848 7.65013C11.3779 8.3065 10.9808 9.19674 10.9808 10.125V10.625H8.82692C8.54131 10.625 8.26739 10.7304 8.06542 10.9179C7.86346 11.1054 7.75 11.3598 7.75 11.625V18.375C7.75 19.5937 8.86058 20.625 10.1731 20.625H19.3269C19.9618 20.6252 20.5715 20.3947 21.0258 19.9828C21.2543 19.7803 21.4364 19.5369 21.5608 19.2673C21.6853 18.9977 21.7497 18.7074 21.75 18.4141V11.625C21.7504 11.4938 21.7228 11.3638 21.6688 11.2426C21.6148 11.1214 21.5355 11.0113 21.4353 10.9187ZM17.3242 14.1875L14.3088 17.6875C14.2593 17.745 14.1967 17.7915 14.1256 17.824C14.0544 17.8564 13.9764 17.8738 13.8972 17.875H13.8885C13.8107 17.875 13.7338 17.8594 13.6632 17.8292C13.5925 17.7989 13.5298 17.7549 13.4792 17.7L12.1869 16.2975C12.141 16.2476 12.106 16.1898 12.0841 16.1273C12.0622 16.0649 12.0538 15.9991 12.0593 15.9336C12.0648 15.8681 12.0841 15.8043 12.1162 15.7458C12.1482 15.6873 12.1924 15.6352 12.2462 15.5925C12.2999 15.5498 12.3622 15.5174 12.4294 15.4971C12.4966 15.4767 12.5675 15.4689 12.638 15.474C12.7085 15.4791 12.7773 15.497 12.8403 15.5268C12.9033 15.5566 12.9594 15.5976 13.0054 15.6475L13.875 16.5909L16.4835 13.5625C16.5728 13.4589 16.7027 13.3925 16.8447 13.3778C16.9867 13.3632 17.1291 13.4015 17.2407 13.4844C17.3523 13.5673 17.4238 13.6879 17.4396 13.8198C17.4554 13.9516 17.4141 14.0839 17.3249 14.1875H17.3242ZM17.4423 10.625H12.0577V10.125C12.0577 9.46196 12.3413 8.82607 12.8462 8.35723C13.3512 7.88839 14.036 7.625 14.75 7.625C15.464 7.625 16.1488 7.88839 16.6537 8.35723C17.1587 8.82607 17.4423 9.46196 17.4423 10.125V10.625Z"
                                fill="white"></path>
                        </svg>
                    </div>
                    <div className="text"><span>Giỏ hàng</span></div>
                </div>
                <div className="checkout-step status-two is-active" data-box="cart-info-order-box">
                    <div className="icon">
                        <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.4009" cy="14" r="13.5" fill="#E30019"></circle>
                            <path
                                d="M20.0009 9H8.80088C8.02878 9 7.40088 9.56062 7.40088 10.25V17.75C7.40088 18.4394 8.02878 19 8.80088 19H20.0009C20.773 19 21.4009 18.4394 21.4009 17.75V10.25C21.4009 9.56062 20.773 9 20.0009 9ZM12.1014 11.5C12.9071 11.5 13.5014 12.0306 13.5014 12.75C13.5014 13.4694 12.9071 14 12.1014 14C11.2957 14 10.7014 13.4694 10.7014 12.75C10.7014 12.0306 11.295 11.5 12.1014 11.5ZM14.7019 16.5H9.50088V16.2094C9.50088 15.3512 10.6741 14.4688 12.1014 14.4688C13.5287 14.4688 14.7019 15.3512 14.7019 16.2094V16.5ZM19.3009 15.875H16.5009V14.625H19.3009V15.875ZM19.3009 13.375H15.8009V12.125H19.3009V13.375Z"
                                fill="white"></path>
                        </svg>
                    </div>
                    <div className="text"><span>Thông tin đặt hàng</span></div>
                </div>
                <div className="checkout-step status-three is-active" data-box="cart-payment-order-box">
                    <div className="icon">
                        <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.1709" cy="14" r="13.5" fill="#E30019"></circle>
                            <path
                                d="M7.16553 10.6667C7.16553 10.2246 7.34987 9.80072 7.678 9.48816C8.00614 9.17559 8.45118 9 8.91523 9H19.4134C19.8775 9 20.3225 9.17559 20.6507 9.48816C20.9788 9.80072 21.1631 10.2246 21.1631 10.6667V11.5H7.16553V10.6667ZM7.16553 13.1667V17.3333C7.16553 17.7754 7.34987 18.1993 7.678 18.5118C8.00614 18.8244 8.45118 19 8.91523 19H19.4134C19.8775 19 20.3225 18.8244 20.6507 18.5118C20.9788 18.1993 21.1631 17.7754 21.1631 17.3333V13.1667H7.16553ZM9.79008 14.8333H10.6649C10.897 14.8333 11.1195 14.9211 11.2835 15.0774C11.4476 15.2337 11.5398 15.4457 11.5398 15.6667V16.5C11.5398 16.721 11.4476 16.933 11.2835 17.0893C11.1195 17.2455 10.897 17.3333 10.6649 17.3333H9.79008C9.55805 17.3333 9.33553 17.2455 9.17147 17.0893C9.0074 16.933 8.91523 16.721 8.91523 16.5V15.6667C8.91523 15.4457 9.0074 15.2337 9.17147 15.0774C9.33553 14.9211 9.55805 14.8333 9.79008 14.8333Z"
                                fill="white"></path>
                        </svg>
                    </div>
                    <div className="text"><span>Xác nhận thông tin</span></div>
                </div>
                <div className="checkout-step status-four is-active">
                    <div className="icon">
                        <svg viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.4321" cy="14" r="13.5" fill="#E30019"></circle>
                            <path
                                d="M13.0988 17.1818L10.4321 14.6364L11.3721 13.7391L13.0988 15.3809L17.4921 11.1873L18.4321 12.0909M14.4321 7L8.43213 9.54545V13.3636C8.43213 16.8955 10.9921 20.1982 14.4321 21C17.8721 20.1982 20.4321 16.8955 20.4321 13.3636V9.54545L14.4321 7Z"
                                fill="white"></path>
                        </svg>
                    </div>
                    <div className="text"><span>Hoàn tất</span></div>
                </div>
            </section>
            <div className='cart-step-4'>
                <div className='cart_page_bg'>
                    <div className='cart_icon'>
                        <img src={cart_icon} alt="cart_icon" className="cart_img" />
                    </div>
                    <p className='title'>
                        Đặt hàng thành công!
                    </p>
                    <p className='content'>Đơn hàng #{props.orderResult.order_code} đang được chuẩn bị, dự kiến giao trong 1-2 ngày tới, không tính các ngày Chủ nhật, ngày lễ,...</p>
                </div>
                <div className="empty-cart">
                    <Link className='empty-cart-button' to={'/'}>Quay lại trang chủ</Link>
                </div>
            </div>
        </>
    )
}
function PaySection(props) {

    const renderSwitch = (param) => {
        switch (param) {
            case 0:
                return <StepOne {...props} />;
            case 1:
                return <StepTwo {...props} />;
            case 2:
                return <StepThree {...props} />;
            case 3:
                return <StepFour {...props} />;
            default:
                break;
        }
    }

    return (
        <>
            {renderSwitch(props.payStep)}
        </>
    )
}
function ButtonChangePage(props) {
    return (
        props.cart && props.cart.length > 0 && <>
            <div className={props.payStep === 0 ? 'wrap-button-0 mt-3 mb-3 text-right' : 'container-fluid wrap-button mt-3 mb-3'}>
                {props.payStep !== 0 && <>
                    <button type="button" onClick={() => props.setPayStep(props.payStep - 1)} className="btn btn-secondary prev-step"><i className="mdi mdi-arrow-left ms-1"></i> Quay lại</button>
                </>}

                {props.payStep < 3 && <>
                    <button type="button" onClick={() => props.setPayStep(props.payStep + 1)} className="btn btn-info next-step">{props.payStep == 2 ? "Đặt hàng" : "Bước tiếp theo"} <i className="mdi mdi-arrow-right ms-1"></i></button>
                </>}
            </div>
        </>
    )
}
const CartPage = () => {
    const defaultOrderData = { gender: 1, name: '', phone_number: '', city: '', district: '', ward: '', street: '', note: '', item: [] }
    const [cookies, setCookie] = useCookies(['cart']);
    const [cart, setCart] = useState([])
    const [payStep, setPayStep] = useState(0)
    const [cities, setCities] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [selectedCity, setSelectedCity] = useState([])
    const [selectedDistrict, setSelectedDistrict] = useState([])
    const [selectedWard, setSelectedWard] = useState([])
    const [orderData, setOrderData] = useState(defaultOrderData)
    const [confirmOrderInfo, setConfirmOrderInfo] = useState({ ...defaultOrderData, gender: "Anh" })
    const [orderResult, setOrderResult] = useState({ order_code: '', date: '' })
    const [cost, setCost] = useState(0)
    //    useEffect(() => {
    //     console.log(cost)
    //    },[cookies])

    useEffect(() => {
        if (cookies.cart && Object.keys(cookies.cart).length > 0) {
            let temp_arr = Object.keys(cookies.cart).map(val => cookies.cart[val])
            setOrderData({ ...orderData, item: temp_arr })
        }
    }, [cookies])


    useEffect(() => {
        if (orderData.city) {
            getDistrict(orderData.city)
        }

    }, [orderData.city])

    useEffect(() => {
        if (orderData.district) {
            getWards(orderData.district)
        }
    }, [orderData.district])

    useEffect(() => {
        refreshData()
        getCities()

    }, [])


    const notify = (type, message) => toast[type](message);


    const handleSubmit = async () => {

        const response = await callApi(apiPostOrder, orderData, '', '')
        if (response && response.isSuccess == true) {
            updateCookie([])
            setOrderResult({ ...orderResult, order_code: response.message.order_code, date: response.message.date })
        } else {
            console.log('order fail')
        }
        // return notify(response.isSuccess, response.message)
        // toast.promise(
        //     response,
        //     {
        //         pending: 'Promise is pending',
        //         success: 'Promise resolved 👌',
        //         error: 'Promise rejected 🤯'
        //     }
        // )
    }
    const updateOrderData = (name, val) => {
        (val && val.value) && setOrderData({ ...orderData, [name]: val.value })
        switch (name) {
            case 'gender':
                setConfirmOrderInfo({ ...confirmOrderInfo, [name]: val.value == 0 ? "Chị" : "Anh" })
                break;
            case 'name':
                setConfirmOrderInfo({ ...confirmOrderInfo, [name]: val.value })
                break;
            case 'phone_number':
                setConfirmOrderInfo({ ...confirmOrderInfo, [name]: val.value })
                break;
            case 'city':
                setSelectedCity({ value: val.value, label: val.label })
                setConfirmOrderInfo({ ...confirmOrderInfo, [name]: val.label })
                break;
            case 'district':
                setSelectedDistrict({ value: val.value, label: val.label })
                setConfirmOrderInfo({ ...confirmOrderInfo, [name]: val.label })
                break;
            case 'ward':
                setSelectedWard({ value: val.value, label: val.label })
                setConfirmOrderInfo({ ...confirmOrderInfo, [name]: val.label })
                break;
            case 'street':
                setConfirmOrderInfo({ ...confirmOrderInfo, [name]: val.value })
                break;
            default:
                break;
        }
    }
    const getDistrict = async (city_id) => {
        const response = await callApi(apiGetDistrict, '', '?city_id=' + city_id, '')
        if (response && response.data) setDistricts(response.data)
    }
    const getWards = async (district_id) => {
        const response = await callApi(apiGetWard, '', '?district_id=' + district_id, '')
        if (response && response.data) setWards(response.data)
    }
    const getCities = async () => {
        const response = await callApi(apiGetCities, '', '', '')
        if (response && response.data) setCities(response.data)
    }
    const createData = (data, callBack) => {
        const temp_arr = [];
        Object.keys(data).map((val) => {
            return temp_arr.push(data[val])
        })
        callBack(temp_arr)
    }
    const createParams = (arr) => {
        let qwe;
        return arr.map(val => {
            qwe = new URLSearchParams(val)
            return '&' + qwe.toString()
        })
    }

    async function fetchData(data) {
        //ham them so luong vat pham
        try {
            let sum = 0;
            const response = await callApi(getProduct, '', '?type=1' + createParams(data))
            if (response.message.data) {
                let a = response.message.data.map((val, key) => {
                    if (data[key].product_version === val.id)
                        sum += val.unit_price * data[key].quantity
                    return { ...val, quantity: data[key].quantity }
                })
                setCost(sum)
                setCart(a)
            }
        } catch (e) {
            console.error("E: ", e.message)
        }
    }

    const updateCookie = (cookie) => {
        setCookie('cart', cookie, { path: '/' });
    }

    const calculateTotal = () => {
        let sum = 0;
        let a = cart.map(val => {
            if (cookies.cart[val.id].product_version === val.id)
                sum += val.unit_price * cookies.cart[val.id].quantity
        })
        setCost(sum)
    }

    const refreshData = () => {
        (cookies.cart && Object.keys(cookies.cart).length >= 1) && createData(cookies.cart, fetchData)
    }

    return (
        <>
            <ToastContainer />

            <div className="cart">

                <PaySection calculateTotal={calculateTotal} cost={cost} selectedWard={selectedWard} selectedDistrict={selectedDistrict} selectedCity={selectedCity} orderResult={orderResult} confirmOrderInfo={confirmOrderInfo} wards={wards} handleSubmit={handleSubmit} orderData={orderData} updateOrderData={updateOrderData} districts={districts} cities={cities} payStep={payStep} cart={cart} setCart={setCart} cookies={cookies} updateCookie={updateCookie} refreshData={refreshData} />
                {cookies.cart && Object.keys(cookies.cart).length > 0 && payStep < 3 && <ButtonChangePage cart={cart} payStep={payStep} setPayStep={setPayStep} />}
            </div>
        </>
    )
}

export default CartPage