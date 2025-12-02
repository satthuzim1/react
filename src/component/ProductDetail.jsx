import { React, useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FormatVND, GetPercent } from "../js/format";
import { useCookies } from 'react-cookie'
import Img from '../images/products/th-truemilk.png'
import PageNotFound from '../layout/PageNotFound';
import { Message } from '../layout/Context'
import { getProduct, callApi } from '../js/api';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function ProductDetail() {
    let { productId } = useParams();
    const [active, setActive] = useState(0)
    const [tempCart, setTempCart] = useState([])
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({
        "isSuccess": false,
        "message": {
            'inventories': []
        }
    })
    const [cookies, setCookie] = useCookies(['cart']);
    const notify = (type, message) => toast[type](message);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await callApi(getProduct, '', '/' + productId)

                if (response.message && Object.keys(response.message).length === 0) {
                    setLoading(false)
                }
                if (Object.keys(response.message).length !== 0) {
                    setProduct(response)
                    setTempCart({ product_version: Number(response.message.inventories[0].id) })
                }
            } catch (e) {
                console.error("E: fetch fail")
            }
        }
        // removeCookie('cart')
        fetchData()
    }, [productId])

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.dataset.index) {
            setActive(Number(e.target.dataset.index))
            setTempCart({ product_version: Number(e.target.dataset.version) })
        } else {
            addToCart(tempCart)
            notify('success', 'Thêm dữ liệu thành công!')

        };
    }

    const addToCart = (item) => {

        let updatedCart = { ...cookies.cart };

        if (updatedCart[item.product_version]) {
            updatedCart[item.product_version].quantity += 1;
        } else {
            updatedCart[item.product_version] = { ...item, quantity: 1 };
        }
        setCookie('cart', updatedCart, { path: '/' });
    };


    return (
        <>
            {loading && product.message.inventories && product.message.inventories.length !== 0 ?
                (<>
                    <ToastContainer />

                    <div className="product-detail-page">
                        <div className="navigate">
                            <ul>
                                <li>{product.message.category_name}</li>
                                {/* <li>Đồng hồ thông minh apple</li> */}
                            </ul>
                        </div>
                        <div className="product-detail">
                            <div className="product-name">
                                <span>{product.message.product_name}</span>
                            </div>
                            <div className="sub-1">
                                <div className="left-column">
                                    <div className="product-img">
                                        <img
                                            src={Img}
                                            alt={product.message.product_name} />
                                    </div>
                                    <div className="product-privacy">
                                        <ul>
                                            <li>
                                                Đổi trả trong 30 ngày
                                            </li>
                                            <li>
                                                Bảo hành chính hãng 12 tháng tại trung tâm bảo hành chính hãng
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="right-column">
                                    <div className="product-version">
                                        <div className="box03 color group desk">
                                            {product.message.inventories.map((element, index) => {
                                                return <Link key={index}
                                                    data-index={index}
                                                    data-id={element.id}
                                                    data-version={element.id}
                                                    className={active === index ? "box03__item item act" : "box03__item item"}
                                                    onClick={handleClick} to="#">
                                                    {element.attribute_name}
                                                </Link>
                                            })}

                                        </div>
                                    </div>
                                    <div className="product-price">
                                        <p className="box-price-present"><FormatVND number={product.message.inventories[active].unit_price} /></p>

                                        {(product.message.inventories[active].compare_price > product.message.inventories[active].unit_price) && <p className="box-price-old"><FormatVND number={product.message.inventories[active].compare_price} /></p>}

                                        {(product.message.inventories[active].compare_price > product.message.inventories[active].unit_price) && <p className="box-price-percent"><GetPercent old={product.message.inventories[active].compare_price} new={product.message.inventories[active].unit_price} /></p>}
                                    </div>
                                    <div className="block__promo">
                                        <div className="pr-top">
                                            <p className="pr-txtb">Khuyến mãi </p>
                                            <i className="pr-txt">Giá và khuyến mãi dự kiến áp dụng đến 23:00 | 31/03</i>
                                        </div>
                                        <div className="pr-content">
                                            <div className="pr-item">
                                                <div className="divb t1" data-promotion="2249446" data-group="WebNote" data-discount="0"
                                                    data-productcode="" data-tovalue="100">
                                                    <span className="nb">1</span>
                                                    <div className="divb-right">
                                                        <p>Thu cũ đổi mới trợ giá thêm 300.000đ (Không kèm thanh toán qua cổng
                                                            online, mua kèm).</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="#"
                                        onClick={handleClick}
                                        className="btn-buynow jsBuy">MUA NGAY</Link>
                                </div>
                            </div>
                        </div>
                        <div className="block-1">
                            <div className="left-column">
                                <div className="prod-description">
                                    <h2>Mô tả sản phẩm</h2>
                                    <div className="content-article">
                                        <h3>&nbsp;</h3>
                                        <h3>
                                            <a href="https://www.thegioididong.com/dong-ho-thong-minh/apple-watch-se-2023-40mm-vien-nhom-day-silicone"
                                                target="_blank" rel="noreferrer"
                                                title="Apple Watch SE 2023 GPS 40mm viền nhôm dây thể thao tại Thế Giới Di Động">
                                                Apple Watch SE 2023 GPS 40mm viền nhôm dây thể thao
                                            </a>
                                            là chiếc smartwatch có mức giá dễ tiếp cận nhất nhà Táo, là lựa chọn tối ưu ngân sách
                                            cho người dùng nhưng vẫn đảm bảo một thiết kế đẹp mắt, hỗ trợ đa dạng tính năng cũng như
                                            tiện ích hằng ngày.
                                        </h3>
                                        <h3>
                                            Thiết kế quen thuộc với độ nhận diện cao
                                        </h3>
                                        <p>
                                            Xét về mặt thiết kế thì
                                            <a href="https://www.thegioididong.com/dong-ho-thong-minh-apple-watch-se-2023"
                                                target="_blank" rel="noreferrer" title="Xem thêm Apple Watch SE 2023 tại Thế Giới Di Động">
                                                Apple Watch SE 2023
                                            </a>
                                            không có nhiều sự khác biệt so với các phiên bản đã ra mắt trước đó. Mặt đồng hồ được bo
                                            cong 4 góc tạo nên sự liền mạch, mang đến cảm giác hiện đại và sang trọng. Khung viền
                                            bằng <strong>hợp kim nhôm</strong> vừa chắc chắn vừa có khối lượng nhẹ, thoải mái hơn
                                            trong quá trình sử dụng.</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-1.jpg"
                                        >
                                            <img alt="Apple Watch SE 2023 GPS 40mm - Thiết kế "
                                                data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-1.jpg"
                                                className=" lazyloaded"
                                                title="Apple Watch SE 2023 GPS 40mm - Thiết kế "
                                                src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-1.jpg" /></a>
                                        </p>
                                        <p>Kích thước mặt <strong>40 mm</strong> cung cấp một không gian hiển thị vừa đủ dùng. Với
                                            phiên bản này thì dây đeo đi cùng là phần dây ngắn với 7 nút gài. Kích thước cổ tay mình
                                            là 14 cm, đây cũng là kích thước cổ tay trung bình của đại đa số con gái châu Á nên cảm
                                            giác khi đeo lên tay rất vừa vặn gọn gàng.</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-2.jpg"
                                        ><img alt="Apple Watch SE 2023 GPS 40mm - Mặt 40mm"
                                            data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-2.jpg"
                                            className=" lazyloaded"
                                            title="Apple Watch SE 2023 GPS 40mm - Mặt 40mm"
                                            src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-2.jpg" /></a>
                                        </p>
                                        <p>Chất liệu dây bằng <strong>silicone </strong>nền bề mặt rất mềm mịn. Dây đồng hồ có thể
                                            tháo rời nên bạn hoàn toàn có thể thay đổi nhiều loại dây khác để phù hợp với các loại
                                            trang phục khác nhau, tạo sự đa dạng trong phong cách.</p>
                                        <p>Về cảm nhận của mình khi đeo, đó là dù dây rất là mềm mại, cảm giác đeo cũng rất thoải
                                            mái và không có bất kỳ sự cản trở nào trong hoạt động hàng ngày, nhưng nếu đeo liên tục
                                            nhiều giờ thì nó sẽ khá bí và đổ mồ hôi, nên phần da tay của bạn nào nhạy cảm thì nó sẽ
                                            khá ngứa và hơi khó chịu một chút. Do đó chúng ta nên thường xuyên tháo ra để cho cổ tay
                                            thông thoáng và không bị ngứa.</p>
                                        <p>
                                            <a className="preventdefault"
                                                href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-14.jpg"
                                            >
                                                <img alt="Apple Watch SE 2023 GPS 40mm - Dây silicone"
                                                    data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-14.jpg"
                                                    className=" lazyloaded"
                                                    title="Apple Watch SE 2023 GPS 40mm - Dây silicone"
                                                    src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-14.jpg" />
                                            </a>
                                            &nbsp;Apple
                                            Watch sở hữu <strong>màn hình OLED</strong> với <strong>độ phân giải</strong> <strong>324
                                                x 394 pixels</strong> mang đến những nội dung chi tiết nhất, còn màu sắc thì vô cùng
                                            chân thật. Màn hình được bảo vệ bởi một lớp <strong>kính cường lực Ion-X</strong> có độ
                                            cứng cao, hạn chế tối đa những vết nứt khi vô tình va chạm trong quá trình sử dụng.
                                        </p>
                                        <p>Một điểm đáng tiếc là chiếc Apple Watch SE 2023 này vẫn chưa được trang bị tính năng
                                            Always On Display (Màn hình luôn sáng), dù vậy thì đồng hồ vẫn hỗ trợ tính năng Nâng cổ
                                            tay sáng màn hình, khi mình dùng thì thấy đồng hồ phản hồi rất nhanh chỉ với thao tác
                                            nhấc nhẹ cổ tay, ngoài ra cũng giúp tiết kiệm pin hơn.</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-4.jpg"
                                        ><img alt="Apple Watch SE 2023 GPS 40mm - Màn hình OLED"
                                            data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-4.jpg"
                                            className=" lazyloaded"
                                            title="Apple Watch SE 2023 GPS 40mm - Màn hình OLED"
                                            src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-4.jpg" /></a>
                                        </p>
                                        <h3>Hệ điều hành thế hệ mới, CPU mạnh mẽ</h3>
                                        <p>Ở thế hệ 2023 thì Apple Watch SE được trang bị bộ vi xử lý <strong>Apple S8 SiP</strong>
                                            được sản xuất trên quy trình 7 nm của TSMC, mang đến hiệu suất ổn định và trải nghiệm
                                            mượt mà, cảm giác vuốt chạm cực kỳ thích. Cho dù chúng ta có thao tác ra vào ứng dụng
                                            liên tục trên màn hình thì cũng không xảy ra tình trạng đơ máy hay là giật lag, đây cũng
                                            là một trong những điểm mạnh nhất của các thiết bị nhà Apple.</p>
                                        <p><a href="https://www.thegioididong.com/dong-ho-thong-minh-apple" target="_blank" rel="noreferrer"
                                            title="Xem thêm các mẫu Apple Watch tại Thế Giới Di Động">Apple Watch</a> chạy trên
                                            <strong>hệ điều hành WatchOS 10</strong> (tại thời điểm ra mắt) với các ứng dụng được
                                            thiết kế mới, nhiều kiểu mặt đồng hồ hơn, vùng hiển thị thông tin mở rộng,... Một điều
                                            cần lưu ý là Apple Watch SE 2023 chỉ tương thích iPhone Xs trở lên và sử dụng phiên bản
                                            hệ điều hành mới nhất.</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-7.jpg"
                                        ><img alt="Apple Watch SE 2023 GPS 40mm - WatchOS 10"
                                            data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-7.jpg"
                                            className="lazyload"
                                            title="Apple Watch SE 2023 GPS 40mm - WatchOS 10" /></a>
                                        </p>
                                        <p>Với WatchOS 10, chúng ta có thể sử dụng mở tính năng Ngăn xếp thông minh để xem các thông
                                            tin mong muốn, cũng như là thay đổi hoặc thêm các tùy chọn cần thiết một cách nhanh
                                            chóng chỉ với thao tác xoay Digital Crown, hoặc nhấn 2 lần để vào quản lý đa nhiệm. Để
                                            xem thời lượng pin và các trạng thái khác của đồng hồ chúng ta sẽ nhấn một lần vào nút
                                            nguồn bên dưới, nhấn 2 lần để vào Apple Pay.</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-5.jpg"
                                        ><img alt="Apple Watch SE 2023 GPS 40mm - WatchOS 10"
                                            data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-5.jpg"
                                            className="lazyload"
                                            title="Apple Watch SE 2023 GPS 40mm - WatchOS 10" /></a>
                                        </p>
                                        <h3>Trợ lý sức khỏe đa năng</h3>
                                        <p>Apple Watch SE 2023 được trang bị cảm biến nhịp tim quang học thứ 2, giúp đo nhịp tim một
                                            cách chính xác và liên tục. Đồng hồ cũng có thể phát hiện nhịp tim cao, thấp bất thường
                                            và gửi cảnh báo cho chúng ta kịp thời.</p>
                                        <p>Bên cạnh đó đồng hồ thông minh đa tiện ích của Apple có các chức năng sức khỏe khác như:
                                            Theo dõi giấc ngủ, tính lượng calories tiêu thụ, theo dõi chu kỳ kinh nguyệt, mức độ
                                            stress,... thông qua đó giúp ta thấu hiểu cơ thể hơn.</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-9.jpg"
                                        ><img alt="Apple Watch SE 2023 GPS 40mm - Theo dõi sức khỏe"
                                            data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-9.jpg"
                                            className="lazyload"
                                            title="Apple Watch SE 2023 GPS 40mm - Theo dõi sức khỏe" /></a>
                                        </p>
                                        <p>Hiện nay, sức khỏe tinh thần cũng được nhiều người chú trọng, thấu hiểu được điều đó
                                            Apple đã cho ra mắt tính năng Chú tâm hỗ trợ người dùng ghi lại trạng thái cảm xúc. Ứng
                                            dụng cung cấp các bài tập hô hấp, thiền định và các bài tập khác giúp chúng ta giảm căng
                                            thẳng và cải thiện sức khỏe tinh thần.</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-10.jpg"
                                        ><img alt="Apple Watch SE 2023 GPS 40mm - Ứng dụng Chú tâm"
                                            data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-10.jpg"
                                            className="lazyload"
                                            title="Apple Watch SE 2023 GPS 40mm - Ứng dụng Chú tâm" /></a>
                                        </p>
                                        <p>Bên cạnh đó, Phát hiện va chạm và Phát hiện té ngã cũng là những tính năng an toàn quan
                                            trọng trên Apple Watch. Tính năng này sử dụng con quay hồi chuyển dải động cao và gia
                                            tốc kế để nhận diện những cú va chạm mạnh. Khi phát hiện va chạm, đồng hồ sẽ gửi thông
                                            báo xác nhận tình trạng của bạn, nếu không nhận được phản hồi thì sẽ tự động gọi tới
                                            những liên hệ khẩn cấp được thiết lập trước đó giúp bạn nhận được sự hỗ trợ kịp
                                            thời.</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-11.jpg"
                                        ><img alt="Apple Watch SE 2023 GPS 40mm - Tính năng an toàn"
                                            data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-11.jpg"
                                            className="lazyload"
                                            title="Apple Watch SE 2023 GPS 40mm - Tính năng an toàn" /></a>
                                        </p>
                                        <h3>Luyện tập ngoài trời với khả năng định vị chuẩn xác</h3>
                                        <p>Nếu bạn là một người yêu thích việc tập luyện thể thao, rèn luyện sức khỏe ở mức cơ bản,
                                            thì chiếc Apple Watch SE 2023 này có thể đáp ứng được nhu cầu của bạn, bởi nó được trang
                                            bị đa dạng các loại bài tập khác nhau từ các bộ môn đơn giản ngoài trời như là đi bộ,
                                            đạp xe, đến bộ môn bơi lội nhờ có khả năng <strong>chống nước</strong> <strong>5 ATM
                                                chuẩn ISO 22810:2010</strong>,...</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-12.jpg"
                                        ><img alt="Apple Watch SE 2023 GPS 40mm - Hỗ trợ luyện tập"
                                            data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-12.jpg"
                                            className="lazyload"
                                            title="Apple Watch SE 2023 GPS 40mm - Hỗ trợ luyện tập" /></a>
                                        </p>
                                        <p>Mình có dùng đồng hồ để theo dõi môn đi bộ, thì đồng hồ đã ghi lại các số liệu như thời
                                            gian di chuyển, số calo tiêu hao, nhịp tim, tốc độ trung bình,... Dựa vào những thông
                                            tin này bạn cũng có thể thiết lập một chế độ tập luyện phù hợp, tránh bị quá
                                            sức.&nbsp;</p>
                                        <p>Với hệ thống định vị gồm <strong>GPS, GLONASS, Galileo và QZSS</strong> được tích hợp sẵn
                                            trên đồng hồ thì khi luyện tập ngoài trời mình cũng không cần mang theo điện thoại bên
                                            người.</p>
                                        <p>Mình có xem lại quãng đường mình đi được khi đồng bộ dữ liệu với điện thoại, thì kết quả
                                            hoàn toàn trùng khớp và không hề bị lệch khỏi đoạn đường mình đã đi.&nbsp;</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-13.jpg"
                                        ><img alt="Apple Watch SE 2023 GPS 40mm - Định vị độc lập"
                                            data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-13.jpg"
                                            className="lazyload"
                                            title="Apple Watch SE 2023 GPS 40mm - Định vị độc lập" /></a>
                                        </p>
                                        <p>Tuy nhiên, do phạm vi quãng đường đi bộ của mình khá ngắn nên là mình có thử lại với
                                            quãng đường dài hơn cùng bài tập đạp xe, kết quả định vị vẫn hiển thị hoàn toàn khớp với
                                            đoạn đường mình đi được nên là mình đánh giá khá cao về hệ thống GPS của chiếc đồng hồ
                                            này.&nbsp;</p>
                                        <h3>Nghe gọi thông qua Bluetooth</h3>
                                        <p><a href="https://www.thegioididong.com/dong-ho-thong-minh" target="_blank" rel="noreferrer"
                                            title="Xem thêm các mẫu đồng hồ thông minh tại Thế Giới Di Động">Đồng hồ thông
                                            minh</a>&nbsp;được trang bị công nghệ <strong>Bluetooth v5.3</strong> hiện đại, nên
                                            khả năng đồng bộ thông báo vô cùng nhanh chóng khi được kết nối với điện thoại.</p>
                                        <p>Không chỉ cho phép mình nhận thông báo của tin nhắn mặc định, Apple Watch còn hiển thị
                                            nhiều thông báo từ ứng dụng bên thứ ba đa dạng như Messenger, Line, Zalo,... Phông chữ
                                            hiển thị cũng rất rõ ràng với độ chi tiết cao, không bị rơi dòng.</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-17.jpg"
                                        ><img alt="Apple Watch SE 2023 GPS 40mm - Nhận thông báo"
                                            data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-17.jpg"
                                            className="lazyload"
                                            title="Apple Watch SE 2023 GPS 40mm - Nhận thông báo" /></a>
                                        </p>
                                        <p>Một điểm cần lưu ý là, với cuộc gọi bình thường hay là gọi Facetime thì chúng ta có thể
                                            đàm thoại trực tiếp, nhưng với cuộc gọi từ ứng dụng Messenger hay Zalo thì đồng hồ sẽ
                                            chỉ hiện thông báo cuộc gọi nhỡ.</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-15.jpg"
                                        ><img
                                                alt="Apple Watch SE 2023 GPS 40mm - Nhận thông báo cuộc gọi"
                                                data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-15.jpg"
                                                className="lazyload" title="Apple Watch SE 2023 GPS 40mm - Nhận thông báo cuộc gọi" /></a>
                                        </p>
                                        <p>Còn với tin nhắn thì chúng ta có thể trả lời bằng giọng nói hoặc là vẽ các chữ cái lên
                                            màn hình như thế này, hoặc cũng có thể phản hồi tin nhắn nhanh bằng những tin nhắn mặc
                                            định trong trường hợp đang chạy xe hoặc là có cuộc họp quan trọng không tiện trả
                                            lời.</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-16.jpg"
                                        ><img alt="Apple Watch SE 2023 GPS 40mm - Trả lời nhanh"
                                            data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-16.jpg"
                                            className="lazyload"
                                            title="Apple Watch SE 2023 GPS 40mm - Trả lời nhanh" /></a>
                                        </p>
                                        <h3>Thời lượng pin không có quá nhiều cải tiến</h3>
                                        <p>Trải nghiệm sử dụng thực tế của mình trên chiếc SE 2023 này, mình đã sạc đầy 100% pin vào
                                            khoảng 4:00 chiều ngày 13 tháng 11 và thời điểm đồng hồ của mình hết pin là vào khoảng
                                            8:30 tối của ngày 14 tháng 11.</p>
                                        <p>Trong khoảng thời gian này mình đã sử dụng nhiều tác vụ khác nhau như là theo dõi giấc
                                            ngủ trong một đêm, bật thông báo tin nhắn ứng dụng và trả lời tin nhắn, đi bộ gần 1
                                            tiếng và cũng không dùng chế độ Nguồn điện thấp, thì pin trên đồng hồ kéo dài chưa đến 1
                                            ngày.</p>
                                        <p><a className="preventdefault"
                                            href="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-18.jpg"
                                        ><img alt="Apple Watch SE 2023 GPS 40mm - Thời lượng pin"
                                            data-src="https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-bv-18.jpg"
                                            className="lazyload"
                                            title="Apple Watch SE 2023 GPS 40mm - Thời lượng pin" /></a>
                                        </p>
                                        <p>Tuy nhiên thì chúng ta không thể lấy con số này làm chuẩn cho thời lượng pin của SE 2023,
                                            bởi vì mỗi người sẽ có cường độ sử dụng khác nhau nên là thời lượng pin cũng sẽ có sự
                                            khác nhau. Dù vậy thì mình vẫn mong Apple sẽ có những cải tiến về thời lượng pin cho
                                            smartwatch trong tương lai gần.</p>
                                        <p>Nhìn chung, tuy không có quá nhiều điểm khác biệt nổi bật so với phiên bản tiền nhiệm,
                                            nhưng Apple Watch SE 2023 vẫn là một chiếc <a
                                                href="https://www.thegioididong.com/dong-ho-thong-minh-da-tien-ich" target="_blank" rel="noreferrer"
                                                title="Xem thêm đồng hồ thông minh đa tiện ích tại Thế Giới Di Động">đồng hồ thông
                                                minh đa tiện ích</a> đáng sở hữu cho các tín đồ nhà Táo với thiết kế mang độ nhận
                                            diện cao, màn hình chất lượng, tính năng đa dạng, đáp ứng tốt nhu cầu sử dụng cơ bản của
                                            người dùng trong cuộc sống hàng ngày.</p>
                                    </div>
                                </div>
                                <div className="evaluate">
                                    <h2>Đánh giá Đồng hồ thông minh Apple Watch SE 2023 GPS 40mm viền nhôm dây thể thao</h2>
                                    <div className="box-star">
                                        <div className="point">
                                            <p>4.8 &nbsp</p>
                                            <i className="iconcmt-allstar"></i>
                                            <i className="iconcmt-allstar"></i>
                                            <i className="iconcmt-allstar"></i>
                                            <i className="iconcmt-allstar"></i>
                                            <i className="iconcmt-allhalfstar"></i>
                                            <p>&nbsp(6 đánh giá)</p>
                                        </div>
                                        <ul className="rate-list">
                                            <li>
                                                <div className="number-star">
                                                    5<i className="iconcmt-blackstar"></i>
                                                </div>
                                                <div className="timeline-star">
                                                    <p className="timing" style={{ width: '83%' }}></p>
                                                </div>
                                                <span className="number-percent">83%</span>
                                            </li>
                                            <li>
                                                <div className="number-star">
                                                    4<i className="iconcmt-blackstar"></i>
                                                </div>
                                                <div className="timeline-star">
                                                    <p className="timing" style={{ width: '17%' }}></p>
                                                </div>
                                                <span className="number-percent">17%</span>
                                            </li>
                                            <li>
                                                <div className="number-star">
                                                    3<i className="iconcmt-blackstar"></i>
                                                </div>
                                                <div className="timeline-star">
                                                    <p className="timing" style={{ width: '0%' }}></p>
                                                </div>
                                                <p className="number-percent dsp">0%</p>
                                            </li>
                                            <li>
                                                <div className="number-star">
                                                    2<i className="iconcmt-blackstar"></i>
                                                </div>
                                                <div className="timeline-star">
                                                    <p className="timing" style={{ width: '0%' }}></p>
                                                </div>
                                                <p className="number-percent dsp">0%</p>
                                            </li>
                                            <li>
                                                <div className="number-star">
                                                    1<i className="iconcmt-blackstar"></i>
                                                </div>
                                                <div className="timeline-star">
                                                    <p className="timing" style={{ width: '0%' }}></p>
                                                </div>
                                                <p className="number-percent dsp">0%</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="comment-list">
                                        <div className="comment">
                                            <div className="cmt-top">
                                                <p className="cmt-top-name">Hoàng</p>
                                                <div className="confirm-buy">
                                                    <i className="iconcmt-confirm"></i>
                                                    Đã mua tại TGDĐ
                                                </div>

                                            </div>
                                            <div className="cmt-intro">
                                                <div className="cmt-top-star">
                                                    <i className="iconcmt-starbuy"></i>
                                                    <i className="iconcmt-starbuy"></i>
                                                    <i className="iconcmt-starbuy"></i>
                                                    <i className="iconcmt-starbuy"></i>
                                                    <i className="iconcmt-starbuy"></i>
                                                </div>
                                            </div>
                                            <div className="cmt-content ">
                                                <p className="cmt-txt">Rất đẹp, ưng ý lắm</p>
                                            </div>
                                        </div>
                                        <div className="comment">
                                            <div className="cmt-top">
                                                <p className="cmt-top-name">Hoàng</p>
                                                <div className="confirm-buy">
                                                    <i className="iconcmt-confirm"></i>
                                                    Đã mua tại TGDĐ
                                                </div>

                                            </div>
                                            <div className="cmt-intro">
                                                <div className="cmt-top-star">
                                                    <i className="iconcmt-starbuy"></i>
                                                    <i className="iconcmt-starbuy"></i>
                                                    <i className="iconcmt-starbuy"></i>
                                                    <i className="iconcmt-starbuy"></i>
                                                    <i className="iconcmt-starbuy"></i>
                                                </div>
                                            </div>
                                            <div className="cmt-content ">
                                                <p className="cmt-txt">Rất đẹp, ưng ý lắm</p>
                                            </div>
                                        </div>
                                        <div className="comment">
                                            <div className="cmt-top">
                                                <p className="cmt-top-name">Hoàng</p>
                                                <div className="confirm-buy">
                                                    <i className="iconcmt-confirm"></i>
                                                    Đã mua tại TGDĐ
                                                </div>

                                            </div>
                                            <div className="cmt-intro">
                                                <div className="cmt-top-star">
                                                    <i className="iconcmt-starbuy"></i>
                                                    <i className="iconcmt-starbuy"></i>
                                                    <i className="iconcmt-starbuy"></i>
                                                    <i className="iconcmt-starbuy"></i>
                                                    <i className="iconcmt-starbuy"></i>
                                                </div>
                                            </div>
                                            <div className="cmt-content ">
                                                <p className="cmt-txt">Rất đẹp, ưng ý lắm</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-from-same-shop">

                                </div>
                            </div>
                            <div className="right-column">
                                <div className="shop-info">
                                    <div className="shop-img">
                                        <img srcSet="https://vcdn.tikicdn.com/cache/w100/ts/seller/de/e1/fa/5e205d4b1e4b52bc22c1ee3932db472f.jpg 1x, https://vcdn.tikicdn.com/cache/w100/ts/seller/de/e1/fa/5e205d4b1e4b52bc22c1ee3932db472f.jpg 2x" className="styles__StyledImg-sc-p9s3t3-0 hbqSye logo" />
                                    </div>
                                    <div className="shop-name">
                                        <div className="sold-by">
                                            Được bán bởi
                                        </div>
                                        <div className="name">
                                            {product.message && product.message.length !== 0 && product.message.seller_name}
                                        </div>
                                        <div className="certificate">
                                            <img src="https://img.lazcdn.com/g/tps/tfs/O1CN01E4X9Ir1HeCP1CreAB_!!6000000000782-2-tps-449-48.png" className="pdp-seller-badge" alt="DUC ANH COFFEE" data-spm-anchor-id="a2o4n.pdp_revamp.seller.i0.51573d83TWqqD8" />
                                        </div>
                                    </div>
                                </div>
                                <div className="seller-link">
                                    <a href="https://google.com">Đến xem shop</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
                :
                (<PageNotFound />)}
        </>)
}
