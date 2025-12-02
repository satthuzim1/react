import React, { useEffect, useState } from 'react';
import { apiGetTag, apiPostViTag, callApi } from '../js/api';
import { Link } from "react-router-dom";
import md5 from 'md5';
import Button from 'react-bootstrap/Button';

function Item(props) {
    const [newVi, setNewVi] = useState('')
    let data = props.dataSearch
    const update = async (id, vitag) => {
        const result = await callApi(apiGetTag, '', '/' + id + '?viTag=' + vitag)
        console.log(result)
    }
    return (
        <>
            {data.length > 0 ? data.map((val, key) =>
            (<div key={key} className="item-ult-tag">
                <div className="tag-name">
                    {val.vi}
                </div>
                <div className="bootstrap-tagsinput">
                    {(typeof val.en_synonyms) === 'object' ? val.en_synonyms.map((val1, key1) => (
                        <React.Fragment key={key1}>
                            <div className=''>
                                <span className='tag label label-info' onClick={() => props.handleClick(val1)}>{val1}</span>
                                <Link to={'/admin/img-train?page=0&tag='+val1} target="_blank" rel="noopener noreferrer"><i className="mdi mdi-database-eye-outline"></i></Link>
                            </div>
                        </React.Fragment>
                    )) : <span className='tag label label-info' onClick={() => props.handleClick(val['en_synonyms'])}>{val['en_synonyms']}</span>
                    }
                </div>

            </div>)
            ) : ''}
        </>
    )
}

const MainLayout = () => {
    const [dataSearch, setDataSearch] = useState([])
    const [listFrame, setListFrame] = useState(false)
    const [prompt, setPrompt] = useState([])
    const [viTag, setViTag] = useState('')


    useEffect(() => { console.log(prompt) }, [prompt])
    useEffect(() => {
        const handler = setTimeout(() => {
            (async () => {
                const result = await callApi(apiGetTag, '', '?v=' + viTag)
                if (result.message.length > 0) {
                    setDataSearch(result.message)
                    setListFrame(true)
                } else setListFrame(false)
            })();
        }, 500);

        // Cleanup timeout nếu người dùng gõ tiếp
        return () => {
            clearTimeout(handler);
        };
    }, [viTag])

    const handleClick = (e) => {
        setPrompt(prev => prev.includes(e) ? prev : [...prev, e])
    }
    return (
        <>
            <div className='row'>
                <div className='col-5'>
                    <div className="header-action-item main-header--search">
                        <div className="header-action_dropdown_mb search-box wpo-wrapper-search">
                            <form action="/search" className="searchform-product searchform-categoris ultimate-search"
                                id="searchform-product">
                                <div className="wpo-search-inner">
                                    <input id="inputSearchAuto" className="input-search" maxLength="40" onKeyUp={(e) => setViTag((e.target.value).trim())}
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

                                    {dataSearch && dataSearch.length > 0 ? <Item dataSearch={dataSearch} handleClick={handleClick} /> :
                                        <div className="item-ult" >
                                            <div className="title">
                                                {dataSearch.length === 0 ? <p>Nhập từ khóa để tìm kiếm sản phẩm</p> : <p>Không tìm thấy sản phẩm phù hợp</p>}
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-7'>
                    <button onClick={() => setPrompt([])}>Xóa </button>
                    <p>{prompt.map((index, key) => (
                        index + ','
                    ))}</p>
                </div>
            </div>
        </>
    )
};
export default MainLayout;