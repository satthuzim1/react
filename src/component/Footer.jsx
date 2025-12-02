import { React, useState, useEffect } from 'react';

function Footer(){
    return (
        <footer>
    <div className="bg-footer">
        <div className="container-fluid">
            <div className="main-footer">
                <div className="column">
                    <ul className="list-inline">
                        <li className="headline-policy">
                            Tư Vấn Và Đặt Hàng
                        </li>
                        <li>
                            <a href="/phuong-thuc-thanh-toan.html" title="Phương thức thanh toán">
                                Phương thức thanh toán
                            </a>
                        </li>
                        <li>
                            <a href="/huong-dan-dat-hang.html" title="Hướng dẫn đặt hàng">
                                Hướng dẫn đặt hàng
                            </a>
                        </li>
                        <li>
                            <a href="/khieu-nai-bao-hanh.html" title="Góp ý, khiếu nại">
                                Góp ý, khiếu nại
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="column">
                    <ul className="list-inline">
                        <li className="headline-policy">
                            Tra Cứu Thông Tin
                        </li>
                        <li>
                            <a href="https://vinvoice.viettel.vn/utilities/invoice-search"
                               title="Tra cứu hóa đơn điện tử">
                                Tra cứu hóa đơn điện tử
                            </a>
                        </li>
                        <li>
                            <a href="https://viettelstore.vn/landing/uu-dai-cua-ban.html"
                               title="Tra cứu ưu đãi của bạn">
                                Tra cứu ưu đãi của bạn
                            </a>
                        </li>
                        <li>
                            <a href="/bao-hanh.html" title="Trung tâm bảo hành">
                                Trung tâm bảo hành
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="column">
                    <ul className="list-inline">
                        <li className="headline-policy">
                            Chính Sách
                        </li>
                        <li>
                            <a href="/bao-hanh.html" title="Chính sách bảo hành">
                                Chính sách bảo hành
                            </a>
                        </li>
                        <li>
                            <a href="/chinh-sach-doi-tra-san-pham.html" title="Chính sách đổi trả">
                                Chính sách đổi trả
                            </a>
                        </li>
                        <li>
                            <a href="/chinh-sach-giao-hang.html" title="chính sách giao hàng">
                                Chính sách giao hàng
                            </a>
                        </li>
                        <li>
                            <a href="/chinh-sach-khui-hop-san-pham.html" title="chính sách khui hộp">
                                Chính sách khui hộp
                            </a>
                        </li>
                        <li>
                            <a href="/chinh-sach-bao-ve-du-lieu-ca-nhan-doi-voi-khach-hang-viettel-store.html"
                               title="Chính sách bảo vệ dữ liệu cá nhân">
                                Chính sách bảo vệ dữ liệu cá nhân
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="column">
                    <ul className="list-inline">
                        <li className="headline-policy">
                            Hỗ trợ khách hàng
                        </li>
                        <li>
                            <a href="https://viettelstore.vn/landing/uu-dai-cua-ban.html"
                               title="Tra cứu ưu đãi của bạn">
                                Các câu hỏi thường gặp
                            </a>
                        </li>
                        <li>
                            <a href="https://viettelstore.vn/landing/uu-dai-cua-ban.html"
                               title="Tra cứu ưu đãi của bạn">
                                Chính sách đổi trả
                            </a>
                        </li>
                        <li>
                            <a href="https://viettelstore.vn/landing/uu-dai-cua-ban.html"
                               title="Tra cứu ưu đãi của bạn">
                                Hỗ trợ khách hàng: hotro@tiki.vn
                            </a>
                        </li>
                        <li>
                            <a href="https://viettelstore.vn/landing/uu-dai-cua-ban.html"
                               title="Tra cứu ưu đãi của bạn">
                                Báo lỗi bảo mật: security@tiki.vn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</footer>
    )
}
export default Footer