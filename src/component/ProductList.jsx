import { React, useEffect, useState, Fragment, useCallback } from 'react';
import { Form, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Cookies, useCookies } from 'react-cookie'
import { getProductWithToken, apiDeleteProduct, excell, callApi } from '../js/api';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { PaginatedItems } from '../component/Category'

function TableBody(props) {
    const arr_data = props.data;
    return (
        <>
            {
                arr_data.map((val, key) => (
                    <Fragment key={key}>
                        <tr>
                            <td rowSpan={val.inventories.length} className='border-custom'>{key + 1}</td>
                            <td rowSpan={val.inventories.length} className='border-custom'>{val.product_name}</td>
                            {val.inventories.map((value, kw) => (
                                kw === 0 && (
                                    <Fragment key={kw}>
                                        <td className={val.inventories.length === 1 ? 'border-custom' : ''}>{value.attribute_name}</td>
                                        <td className={val.inventories.length === 1 ? 'border-custom' : ''}>{value.amount_of_inventory}</td>
                                        <td className={val.inventories.length === 1 ? 'border-custom' : ''}>{value.amount_of_order}</td>
                                        <td className={val.inventories.length === 1 ? 'border-custom' : ''}>{value.status ? "Lên hàng" : "Hết hàng"}</td>
                                        <td className={val.inventories.length === 1 ? 'border-custom' : ''}>
                                            <Link onClick={props.delete} data-id={value.id} data-index={value.product_id}><i className="uil-trash-alt me-2"></i></Link>
                                            <Link><i className="uil-pen me-2"></i></Link>
                                        </td>
                                    </Fragment>)
                            ))}
                        </tr>

                        {val.inventories.map((value, kw) => (
                            kw !== 0 && (
                                <Fragment key={kw}>
                                    <tr>
                                        <td className={value === val.inventories[val.inventories.length - 1] ? 'border-custom' : ''}>{value.attribute_name}</td>
                                        <td className={value === val.inventories[val.inventories.length - 1] ? 'border-custom' : ''}>{value.amount_of_inventory}</td>
                                        <td className={value === val.inventories[val.inventories.length - 1] ? 'border-custom' : ''}>{value.amount_of_order}</td>
                                        <td className={value === val.inventories[val.inventories.length - 1] ? 'border-custom' : ''}>{value.status ? "Lên hàng" : "Hết hàng"}</td>
                                        <td className={value === val.inventories[val.inventories.length - 1] ? 'border-custom' : ''}>
                                            <Link onClick={props.delete} data-id={value.id} data-index={value.product_id}><i className="uil-trash-alt me-2"></i></Link>
                                            <Link ><i className="uil-pen me-2"></i></Link>
                                        </td>
                                    </tr>
                                </Fragment>
                            )
                        ))
                        }
                    </Fragment>
                ))
            }
        </>
    )
}

function ProductList() {
    const [cookies, setCookie] = useCookies(['user']);
    const [data, setData] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [limit, setLimit] = useState([0, itemsPerPage])
    const [totalItem, setTotalItem] = useState(0)

    useEffect(() => {
        fetchData()
    }, [limit])

    const handleChangeLimit = (event) => {
        setItemsPerPage(event.target.value);
        setLimit([0, event.target.value]);
    };
    // const SortData = (data) => {
    //     let temp_data = {}
    //     data.forEach(val => {

    //         const { product_name, ...version } = val;

    //         if (!temp_data[product_name]) {
    //             temp_data[product_name] = { product_name, version: [{ ...version }] }
    //         } else {
    //             temp_data[product_name].version.push(version)
    //         }
    //     })
    //     setData(temp_data)
    // }
    const notify = (type, message) => toast[type](message);

    const deleteProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await callApi(apiDeleteProduct, '', '?id=' + e.currentTarget.dataset.id, cookies)

            if (response.isSuccess) {
                fetchData()
                return notify('success', 'Xóa thành công!')
            } else {
                return notify('error', 'Xóa không thành công!')

            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi gửi dữ liệu đến API:', error);
            return notify('error', 'Xóa thất bại!')
        }
    }

    const fetchData = async () => {
        try {
            const response = await callApi(getProductWithToken, '', '?type=3&page=' + limit[0] + '&pageSize=' + limit[1], cookies)

            setData(response.message.data.rows)
            setTotalItem(response.message.data.count)
            // callBack(response.message.data)
        } catch (error) {
            console.error('Có lỗi xảy ra khi gửi dữ liệu đến API:', error);
        }
    }
    return (
        <>
            <ToastContainer limit={3} />

            <div className='product-list-page'>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <h4 className="page-title">Danh sách sản phẩm</h4>
                        </div>
                    </div>
                </div>
                <div className='page-content'>
                    <div className='button-on-top row'>
                        <div className='col-6 left'>
                            <Link to={'/admin/add-product'} className="add-btn product-url btn btn-danger mb-2">
                                <i className="mdi mdi-plus-circle me-2"></i> Thêm sản phẩm
                            </Link>
                        </div>

                    </div>
                    <div className='row row-2nd mt-3'>
                        <div className='col-6'>
                            <label className="form-label">Hiển thị
                                <select className="form-select form-select-sm ms-2 me-2" value={itemsPerPage} onChange={handleChangeLimit}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="-1">All</option>
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
                                        <th>Tên sản phẩm</th>
                                        <th>Phiên bản</th>
                                        <th>Tồn kho</th>
                                        <th>Hàng đặt</th>
                                        <th>Trạng thái</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length !== 0 ? <TableBody data={data} delete={deleteProduct} /> : <tr><td colSpan={7}>Không có dữ liệu</td></tr>}

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

export default ProductList