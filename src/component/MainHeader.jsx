import { React, useEffect, useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import { Cart } from './Cart'
import { callApi, apiGetKeyWord } from '../js/api'
import img_th_true_milk from '../images/products/th-truemilk.png'
import { FormatVND, removeAccentsAndSpaces } from "../js/format";

function MainHeader(props) {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [dataSearch, setDataSearch] = useState([])
    const [listFrame, setListFrame] = useState(false)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500); // đợi 500ms sau khi người dùng ngừng gõ
        query.length > 0 ? setListFrame(true) : setListFrame(false)
        return () => clearTimeout(timeoutId); // huỷ timeout cũ nếu người dùng gõ tiếp
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.trim() !== '') {
            fetchData(debouncedQuery);
        }
    }, [debouncedQuery]);

    const fetchData = async (searchTerm) => {
        try {
            const result = await callApi(apiGetKeyWord, '', '?q=' + searchTerm,)
            if (result.isSuccess == true && result.message) {
                setDataSearch(result.message)
            }
            // console.log('Fetching for:', query.length);
        } catch (e) {
            console.log(e)
        }
    };
    return (
        <>
            <div className="main-header">
                <div className="sub-main-header">
                    <div className="container-fluid">
                        <div className="row-header">
                            <div className="coll-header main-header--left header-action">
                                <div className="header-action-item main-header--cate">
                                    <div className="header-action_text">
                                        <a className="header-action__link" href="#" id="site-menu-handle" aria-label="Danh mục"
                                            title="Danh mục">
                                            <span className="box-icon">
                                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="-0.00012207" y="0.000190735" width="18" height="2" rx="1"
                                                        fill="white"></rect>
                                                    <rect x="-0.00012207" y="5.99999" width="18" height="2" rx="1"
                                                        fill="white"></rect>
                                                    <rect x="-0.00012207" y="12.0001" width="18" height="2" rx="1"
                                                        fill="white"></rect>
                                                </svg>
                                            </span>
                                            <span className="box-text"><span className="txtnw">Danh mục</span></span>
                                        </a>
                                    </div>

                                </div>
                                <div className="main-header--logo" itemScope="" itemType="http://schema.org/Organization">

                                    <h1 className="d-block">
                                        <Link className='logo' itemProp="url" to='..' >Bluefin</Link>
                                    </h1>

                                </div>
                            </div>
                            <div className="coll-header main-header--right header-action">
                                <div className="header-action-item main-header--search">
                                    <div className="header-action_dropdown_mb search-box wpo-wrapper-search">
                                        <form action="/search" className="searchform-product searchform-categoris ultimate-search"
                                            id="searchform-product">
                                            <div className="wpo-search-inner">
                                                <input id="inputSearchAuto" className="input-search" maxLength="40" onChange={(e) => setQuery(e.target.value)}
                                                    autoComplete="off" type="text" size="20" placeholder="Bạn cần tìm gì?" />
                                            </div>
                                            <button disabled type="submit" className="btn-search btn" id="btn-search">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M10.9999 19C15.4182 19 18.9999 15.4183 18.9999 11C18.9999 6.58172 15.4182 3 10.9999 3C6.5816 3 2.99988 6.58172 2.99988 11C2.99988 15.4183 6.5816 19 10.9999 19Z"
                                                        stroke="#111111" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round"></path>
                                                    <path d="M20.9999 21L16.6499 16.65" stroke="#111111" strokeWidth="2"
                                                        strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </button>
                                        </form>
                                        <div id="ajaxSearchResults" className={listFrame ? 'smart-search-wrapper ajaxSearchResults' : 'smart-search-wrapper-none'}>
                                            <div className="resultsContent">

                                                {dataSearch && dataSearch.length > 0 ? <Item dataSearch={dataSearch} setQuery={setQuery} /> :
                                                    <div className="item-ult" >
                                                        <div className="title">
                                                            {query.length === 0 ? <p>Nhập từ khóa để tìm kiếm sản phẩm</p> : <p>Không tìm thấy sản phẩm phù hợp</p>}
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Cart />

                                <div className="header-action-item main-header--account hide-mb">
                                    <div className="header-action_text">
                                        <a className="header-action__link" href="#" rel="nofollow" id="site-account-handle"
                                            aria-label="Tài khoản" title="Tài khoản">
                                            <span className="box-icon">
                                                <svg viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11.9999 11.9091C10.5412 11.9091 9.14224 11.3344 8.11079 10.3115C7.07934 9.28857 6.49988 7.90118 6.49988 6.45455C6.49988 5.00791 7.07934 3.62052 8.11079 2.5976C9.14224 1.57467 10.5412 1 11.9999 1C13.4586 1 14.8575 1.57467 15.889 2.5976C16.9204 3.62052 17.4999 5.00791 17.4999 6.45455C17.4999 7.90118 16.9204 9.28857 15.889 10.3115C14.8575 11.3344 13.4586 11.9091 11.9999 11.9091Z"
                                                        stroke="white" strokeWidth="2" strokeLinecap="round"></path>
                                                    <path
                                                        d="M0.999878 25.0001V23.5975C0.999878 20.7923 4.49988 15.1819 11.9999 15.1819C19.4999 15.1819 22.9999 20.7923 22.9999 23.5975V25.0001"
                                                        stroke="white" strokeWidth="2" strokeLinecap="round"></path>
                                                </svg>
                                            </span>
                                            <div className="box-text" style={{ textDecoration: 'none' }}>
                                                <div className="txtnw">Đăng</div>
                                                <div className="txtbl">nhập</div>
                                            </div>
                                        </a>
                                        <span className="box-triangle">
                                            <svg viewBox="0 0 20 9" role="presentation">
                                                <path
                                                    d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                                                    fill="#ffffff"></path>
                                            </svg>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
function Item(props) {
    let data = props.dataSearch
    let setQuery = props.setQuery
    return (
        <>
            {
                data.map((val, key) => (
                    <div className="item-ult" key={key}>
                        <div className="thumbs">
                            <Link to={'/product/' + val['id'] + "/" + removeAccentsAndSpaces(val['name'])} onClick={() => setQuery('')}>
                                <img alt={val.name} src={img_th_true_milk} />
                            </Link>

                        </div>
                        <div className="title">
                            <Link to={'/product/' + val['id'] + "/" + removeAccentsAndSpaces(val['name'])} onClick={() => setQuery('')}>
                                {val.name}
                            </Link>
                            <p className="f-initial">
                                <span><FormatVND number={val.unit_price} /></span>
                                <del><FormatVND number={val.compare_price} /></del>
                            </p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
export default MainHeader;