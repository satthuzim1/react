import { React, useEffect, useState, Fragment, useCallback } from 'react';
import { Cookies, useCookies } from 'react-cookie'
import { PaginatedItems } from '../component/Category'

import { apiGetLabel, apiUpdateOrderItemState, apiGetSellerOrder, callApi } from '../js/api';
import { Form, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import {FormatVND} from '../js/format'

function TableBody(props) {
    const arr_data = props.data;
    const shipment_status = {
        null: 'test',
        0: 'Chờ xác nhận',
        1: 'Đang chuẩn bị hàng',
        2: 'Chờ lấy hàng',
        3: 'Đã đến bưu cục',
        4: 'Đang giao',
        5: 'Giao hàng thành công'
    }
    const action_state = {
        0: 'Xác nhận đơn hàng',
        1: 'Soạn hàng xong'
    }
    return (
        <>

            {arr_data.map((val, key) =>
                val.items.map((value, kw) => (
                    <tr key={`${key}-${kw}`}>
                        {kw === 0 && (
                            <>
                                <td rowSpan={val.items.length} className="border-custom">{key + 1}</td>
                                <td rowSpan={val.items.length} className="border-custom">{val.order_code}</td>
                                <td rowSpan={val.items.length} className="border-custom">{val.createdAt}</td>
                                <td rowSpan={val.items.length} className="border-custom">
                                    <Button variant="secondary" className="add-btn product-url mb-2" onClick={() => props.getLabel(val.order_code)}>
                                        <i className="uil-print "></i>
                                    </Button>
                                </td>
                            </>
                        )}
                        <td className="border-custom">{value.product_name}</td>
                        <td className="border-custom">{value.version_name}</td>
                        <td className="border-custom">{value.amount}</td>
                        <td className="border-custom">{value.amount_of_inventory}</td>
                        <td className="border-custom"><FormatVND number={value.unit_price}/></td>
                        <td className="border-custom">{shipment_status[value.state]}</td>
                        <td className="border-custom">{value.shipping_code}</td>
                        <td className="border-custom">

                            {
                                (value.state >= 0 && value.state <= 1) && <>
                                    <Button variant="secondary" className="add-btn product-url mb-2" onClick={() => props.updateOrderState(val.order_code)}>
                                        {action_state[value.state]}
                                    </Button>
                                </>
                            }

                        </td>
                    </tr>
                ))
            )}
        </>
    )
}
const OrderList = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const [data, setData] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [limit, setLimit] = useState([0, itemsPerPage])
    const [totalItem, setTotalItem] = useState(0)
    const notify = (type, message) => toast[type](message);

    useEffect(() => {
        fetchData()
    }, [limit])

    const updateOrderState = async (order_code) => {
        try {
            const response = await callApi(apiUpdateOrderItemState, '', '/' + order_code)
            if (response.isSuccess) {
                notify('success', 'Cập nhật thành công!')
                fetchData()
            } else {
                notify('error', response.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getLabel = async (order_code) => {
        try {
            toast.promise(
                callApi(apiGetLabel, '', '/' + order_code),
                {
                    pending: 'Đang lấy nhãn',
                    success: {
                        render({ data }) {
                            window.open(data.fileUrl, '_blank', 'noopener,noreferrer');
                            return 'Đang mở nhãn'
                        }
                    },
                    error: "Lỗi"
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    const handleChangeLimit = (event) => {
        setItemsPerPage(event.target.value);
        setLimit([0, event.target.value]);
    };

    const fetchData = async () => {
        try {
            const response = await callApi(apiGetSellerOrder, '', '?type=1&page=' + limit[0] + '&pageSize=' + limit[1])
            setData(response.data.rows)
            setTotalItem(response.data.count)
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <>
            <ToastContainer />
            <div className='product-list-page'>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <h4 className="page-title">Danh sách đơn hàng</h4>
                        </div>
                    </div>
                </div>
                <div className='page-content'>
                    {/* <div className='button-on-top row'>
                        <div className='col-6 left'>
                            <Link to={'#'} className="add-btn product-url btn btn-danger mb-2">
                                <i className="mdi mdi-plus-circle me-2"></i> Tạo đơn hàng
                            </Link>
                        </div>

                    </div> */}
                    <div className='row row-2nd mt-3'>
                        <div className='col-6'>
                            <label className="form-label">Hiển thị
                                <select className="form-select form-select-sm ms-2 me-2" value={itemsPerPage} onChange={handleChangeLimit}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    {/* <option value="-1">All</option> */}
                                </select> sản phẩm
                            </label>
                        </div>
                        <div className='col-6 text-sm-end'>

                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-12'>
                            <Table bordered responsive className='product-list'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Mã đơn hàng</th>
                                        <th>Ngày tạo đơn</th>
                                        <th>In nhãn</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Phiên bản</th>
                                        <th>Số lượng đặt</th>
                                        <th>Tồn kho</th>
                                        <th>Giá bán</th>
                                        <th>Trạng thái</th>
                                        <th>Mã vận chuyển</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length !== 0 ? <TableBody getLabel={getLabel} updateOrderState={updateOrderState} data={data} /> : <tr><td colSpan={12}>Không có dữ liệu</td></tr>}

                                </tbody>
                            </Table>
                        </div>
                    </div>
                    {totalItem > itemsPerPage && (<div className='wrap-paginate'>
                        <PaginatedItems itemsPerPage={itemsPerPage} changeLimit={setLimit} total={totalItem} />
                    </div>)}
                </div>
            </div>
        </>
    )
}
export default OrderList