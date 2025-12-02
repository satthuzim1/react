import { React, useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import saleGif from "../images/gif/GIF.gif"
import { Link } from "react-router-dom";
import { FormatVND, removeAccentsAndSpaces, GetPercent } from "../js/format";
import Img from '../images/products/th-truemilk.png'
import { PaginatedItems } from '../component/Category'
import Button from 'react-bootstrap/Button';
import { getProduct, getCategories, callApi } from '../js/api';



import Alert from 'react-bootstrap/Alert';



export function ProductListUi(props) {
    return (
        <>
            {props.arr && (props.arr.map((val, key) => (

                <div className="product-item" key={key}>
                    <Link to={'/product/' + val['id'] + "/" + removeAccentsAndSpaces(val['product_name'])}>
                        <div className="product-img">
                            <img
                                src={Img}
                                alt="Robot hút bụi lau nhà Dreame D9 Max" className="product__img" />
                        </div>
                        <div className="product-name">
                            {val['product_name']}
                        </div>
                        <div className="product-price">
                            <p className="first-price">
                                {(val['compare_price'] > val['unit_price']) && <FormatVND number={val['compare_price']} />}
                            </p>
                            <p className="last-price">
                                <FormatVND number={val['unit_price']} />
                                {(val['compare_price'] > val['unit_price']) && <span className="proloop-label--on-sale">
                                    <GetPercent old={val['compare_price']} new={val['unit_price']} />
                                </span>}
                            </p>

                        </div>
                    </Link>
                </div>
            )))}
        </>
    )
}

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function StickySidebar(props) {
    return (
        <div className={props.highlight ? 'sticky-sidebar active' : 'sticky-sidebar'}>
            <a data-cate="0" data-place="1865" href="https://www.thegioididong.com/flashsale" className="banner-left">
                <img width="90" height="300" src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/05/banner/1-81x275-1.png" alt="Liễn Trái" />
            </a>
            <a data-cate="0" data-place="1866" href="https://www.thegioididong.com/flashsale" className="banner-right">
                <img width="90" height="300" src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/05/banner/ngay-doi-5-80x275.png" alt="Liễn Phải" />
            </a>
        </div>
    )
}

function BannerTopBody() {
    var slickSlider = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
    }

    return (
        <Slider {...slickSlider}>
            <>
                <Link to={'detail'} className='aspect-ratio' aria-label="Laptop Oled" title="Laptop Oled"
                    tabIndex="-1">
                    <picture>
                        <source media="(max-width: 991px)"
                            srcSet="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            data-srcset="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            sizes="651px" />
                        <source media="(min-width: 992px)"
                            srcSet="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            data-srcset="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            sizes="651px" />
                        <img data-sizes="auto" className="lazyautosizes lazyloaded"
                            src="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            data-src="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            alt="Laptop Oled" sizes="651px" />
                    </picture>
                </Link>
            </>
            <>
                <a className="aspect-ratio" href="/products/laptop-asus-vivobook-14-oled-m1405ya-km047w"
                    aria-label="Laptop Oled" title="Laptop Oled"
                    tabIndex="-1">
                    <picture>
                        <source media="(max-width: 991px)"
                            srcSet="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            data-srcset="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            sizes="651px" />
                        <source media="(min-width: 992px)"
                            srcSet="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            data-srcset="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            sizes="651px" />
                        <img data-sizes="auto" className="lazyautosizes lazyloaded"
                            src="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            data-src="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            alt="Laptop Oled" sizes="651px" />
                    </picture>
                </a>
            </>
            <>
                <a className="aspect-ratio" href="/products/laptop-asus-vivobook-14-oled-m1405ya-km047w"
                    aria-label="Laptop Oled" title="Laptop Oled"
                    tabIndex="-1">
                    <picture>
                        <source media="(max-width: 991px)"
                            srcSet="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            data-srcset="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            sizes="651px" />
                        <source media="(min-width: 992px)"
                            srcSet="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            data-srcset="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            sizes="651px" />
                        <img data-sizes="auto" className="lazyautosizes lazyloaded"
                            src="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            data-src="https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-14-oled-m1405ya-km047w-slider_46dfc8f3a021418fb33af9be6052b315.png"
                            alt="Laptop Oled" sizes="651px" />
                    </picture>
                </a>
            </>
        </Slider>
    )
}

function CategoriesSlide(props) {
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await callApi(getCategories, '', '')
                !response.isSuccess && props.handleSet(<>Loading failed</>)
                props.handleSet(response)
            } catch (e) {
                console.error("E: ", e.message)
            }
        }
        fetchCategory();
    }, [])

    var cateSlide = {
        rows: 2,
        dots: false,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 10,
        slidesToScroll: 1,
    }

    return (
        <Slider className='w-100' {...cateSlide}>
            {
                Object.keys(props.itemList.message).map(key => (
                    <Link to={'category/' + props.itemList.message[key]['id'] + '/' + removeAccentsAndSpaces(props.itemList.message[key]['category_name'])} key={props.itemList.message[key]['id']}>
                        <div className="sub-a-1">
                            <div className="cate-img">
                                <img src={props.itemList.message[key]['image']} alt="Avatar" />

                            </div>
                            <div className="cate-title">
                                {props.itemList.message[key]['category_name']}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </Slider>
    )
}

function HomeContent() {
    const [category, setCategory] = useState({ isSuccess: false, message: [] })
    const [list, setList] = useState([])
    const [highlight, setHighlight] = useState(false);

    const [totalItem, setTotalItem] = useState(0)
    const itemsPerPage = 20;
    const [limit, setLimit] = useState([0, itemsPerPage])
    const [saleList, setSaleList] = useState([])


    useEffect(() => {
        const getProductByType = async () => {
            try {
                const response = await callApi(getProduct, '', '?type=0&page=' + limit[0] + '&pageSize=' + limit[1] + '&cate=' + 2)
                const response1 = await callApi(getProduct, '', '?type=4')

                !response.isSuccess && setList(<>Loading failed</>)
                setList(response.message.data)
                setSaleList(response1.message.result)
                setTotalItem(response.message.totalRows)
            } catch (e) {
                console.error("E: ", e.message)
            }
        }
        getProductByType();
    }, [limit])

    useEffect(() => {
        function handleScroll() {
            const threshold = 400; // Ngưỡng scroll
            if (window.scrollY > threshold) {
                setHighlight(true);
            } else {
                setHighlight(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const hanldeClick = (e) => {
        e.preventDefault();
    }
    var saleListSlide = {
        dots: false,
        infinite: false,
        slidesToShow: 5,
    }

    return (
        <div className="home-page">
            <StickySidebar highlight={highlight} />
            <div className="banner-top-body">

                <BannerTopBody />

                <div className="right-banner">
                    <div className="banner-item">
                        <a className="aspect-ratio" href="/products/pc-gvn-intel-i7k-rtx4070tisuper/" aria-label="Banner PC"
                            title="Banner PC" >
                            <picture>
                                <source media="(max-width: 991px)"
                                    srcSet="https://file.hstatic.net/200000722513/file/righ-1_dd4fa147990d4c78b3421f2fbed3593f.png"
                                    data-srcset="https://file.hstatic.net/200000722513/file/righ-1_dd4fa147990d4c78b3421f2fbed3593f.png"
                                    sizes="317px" />
                                <source media="(min-width: 992px)"
                                    srcSet="https://file.hstatic.net/200000722513/file/righ-1_dd4fa147990d4c78b3421f2fbed3593f.png"
                                    data-srcset="https://file.hstatic.net/200000722513/file/righ-1_dd4fa147990d4c78b3421f2fbed3593f.png"
                                    sizes="317px" />
                                <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                    src="https://file.hstatic.net/200000722513/file/righ-1_dd4fa147990d4c78b3421f2fbed3593f.png"
                                    data-src="https://file.hstatic.net/200000722513/file/righ-1_dd4fa147990d4c78b3421f2fbed3593f.png"
                                    alt="Banner PC" sizes="317px" />
                            </picture>
                        </a>
                    </div>
                    <div className="banner-item">
                        <a className="aspect-ratio"
                            href="https://gearvn.com/products/man-hinh-asus-vz24ehf-24-ips-100hz-vien-mong"
                            aria-label="màn hình đồ họa Asus vz24ehf" title="màn hình đồ họa Asus vz24ehf"
                        >
                            <picture>
                                <source media="(max-width: 991px)"
                                    srcSet="https://file.hstatic.net/200000722513/file/right-2_91cb114a2b804741a892ff417bba12f9.png"
                                    data-srcset="https://file.hstatic.net/200000722513/file/right-2_91cb114a2b804741a892ff417bba12f9.png"
                                    sizes="317px" />
                                <source media="(min-width: 992px)"
                                    srcSet="https://file.hstatic.net/200000722513/file/right-2_91cb114a2b804741a892ff417bba12f9.png"
                                    data-srcset="https://file.hstatic.net/200000722513/file/right-2_91cb114a2b804741a892ff417bba12f9.png"
                                    sizes="317px" />
                                <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                    src="https://file.hstatic.net/200000722513/file/right-2_91cb114a2b804741a892ff417bba12f9.png"
                                    data-src="https://file.hstatic.net/200000722513/file/right-2_91cb114a2b804741a892ff417bba12f9.png"
                                    alt="màn hình đồ họa Asus vz24ehf" sizes="317px" />
                            </picture>
                        </a>
                    </div>
                </div>
            </div>
            <div className="category">
                <div className="title">DANH MỤC</div>
                <div className="cate-list">

                    <CategoriesSlide itemList={category} handleSet={setCategory} />

                </div>
            </div>
            <div className="flash-sale">
                <div className="top-title">
                    <img src={saleGif} alt="title" loading="lazy" />

                    <div className="box-countdown">
                        <p className="title">Kết thúc sau: </p>
                        <ul className="box-time">
                            <li><p className="time">
                                00</p>
                                <p className="separate">:</p></li>
                            <li ><p className="time"
                            >
                                20</p>
                                <p className="separate">:</p></li>
                            <li ><p className="time"
                            >
                                13</p>
                                <p className="separate">:</p></li>
                            <li ><p className="time"
                            >
                                30</p>
                                <p className="separate" ></p></li>
                        </ul>
                    </div>
                </div>
                <Slider className='sale-list' {...saleListSlide}>
                    {saleList.length > 0 && saleList.map((val, key) => (

                        <div className="product-info-container" key={key}>
                            <Link to={'/product/' + val['id'] + "/" + removeAccentsAndSpaces(val['product_name'])}>

                                <div className="product-img">
                                    <img
                                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/r/o/robot_h_t_b_i_lau_nh_dreame_d9_max.png"
                                        alt="Robot hút bụi lau nhà Dreame D9 Max" className="product__img" />
                                </div>
                                <div className="product-name">
                                    {val['product_name']}
                                </div>
                                <div className="product-price">
                                    {(val['compare_price'] > val['unit_price']) ?
                                        <p className="first-price"><FormatVND number={val['compare_price']} /> </p> : <p style={{ visibility: 'hidden' }}>p</p>}

                                    <p className="last-price">
                                        <FormatVND number={val['unit_price']} />
                                        {(val['compare_price'] > val['unit_price']) ? <span className="proloop-label--on-sale">
                                            <GetPercent old={val['compare_price']} new={val['unit_price']} />
                                        </span> : <span style={{ visibility: 'hidden' }} className="proloop-label--on-sale">
                                            <GetPercent old={val['compare_price']} new={val['unit_price']} />
                                        </span>}
                                    </p>

                                </div>

                            </Link>
                        </div>
                    ))}

                </Slider>
            </div>
            <div className="best-seller">
                <div className="title">
                    <div className="title-name">
                        LAPTOP
                    </div>
                    <div className="watch-all">
                        <a>Xem tất cả</a>
                    </div>
                </div>
                <div className="product-list">
                    <ProductListUi arr={list} />
                </div>
                {/* <div className='wrap-paginate'>
                    <PaginatedItems itemsPerPage={itemsPerPage} items={list} changeLimit={setLimit} total={totalItem} />
                </div> */}
                <Link to={'#'} className='watch-more' onClick={hanldeClick}>
                    Xem thêm
                </Link>
            </div>
            <BasicExample />
        </div>
    )
}
function BasicExample() {
    return (
        <Alert show={true} variant="light">
            <Alert.Heading>My Alert</Alert.Heading>
            <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                fermentum.
            </p>
            <hr />
            <div className="d-flex justify-content-end">

            </div>
        </Alert>


    );
}
export default HomeContent;