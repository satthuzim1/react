// import logo from './logo.svg';
import { React, useEffect, useState, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Select from 'react-select';
import { getCategories, postProduct, callApi, apiUpload } from '../js/api';
import { useCookies } from 'react-cookie'
import { useDropzone } from 'react-dropzone'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Papa from 'papaparse';
import * as Yup from 'yup';


function SelectComp(props) {
    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                // defaultValue={props.colourOptions[0]}
                isDisabled={false}
                isLoading={false}
                isClearable={false}
                isRtl={false}
                isSearchable={true}
                // name="color"
                options={props.colourOptions}
                name='category'
                onChange={e => props.updateProduct('category', e.value)}
            />

        </>
    );

}
function CreateRow(props) {
    let data = props.dataRows
    return (
        <>
            {props.dataRows && Object.keys(props.dataRows).map((val, key) =>
                <tr key={key}>
                    <td>
                        <input type="text" value={data[val].ver_name} placeholder="Màu sắc, dung lượng, kích thước,..." className="form-control form-table" name="ver_name" onChange={e => props.handleChange(data[val].id, e.target.name, e.target.value)} />
                    </td>
                    <td>
                        <input type="number" value={data[val].inventory} className="form-control form-table " name="inventory" onChange={e => props.handleChange(data[val].id, e.target.name, e.target.value)} />
                    </td>
                    <td>
                        <input type="number" value={data[val].compare} className="form-control form-table " name="compare" onChange={e => props.handleChange(data[val].id, e.target.name, e.target.value)} />
                    </td>
                    <td>
                        <input type="number" value={data[val].sell} className="form-control form-table " name="sell" onChange={e => props.handleChange(data[val].id, e.target.name, e.target.value)} />
                    </td>
                    <td>
                        <input type="number" value={data[val].original} className="form-control form-table " name="original" onChange={e => props.handleChange(data[val].id, e.target.name, e.target.value)} />
                    </td>
                    <td>
                        <select className="form-select " name="status" value={data[val].status} onChange={e => props.handleChange(data[val].id, e.target.name, e.target.value)}>
                            <option value="1">Lên sàn</option>
                            <option value="0">Hết hàng/Lưu kho</option>
                        </select>
                    </td>
                    <td>
                        <input type='file' className='form-control' />
                    </td>
                    <td className="table-action">
                        <Link className="action-icon removeButton" onClick={() => props.deleteItem(data[val].id)}> <i className="uil-trash-alt"></i></Link>
                    </td>
                </tr>
            )}
        </>
    )
}
function DropZoneSelect(props) {
    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                // defaultValue={props.colourOptions[0]}
                isDisabled={false}
                isLoading={false}
                isClearable={false}
                isRtl={false}
                isSearchable={true}
                // name="color"
                options={props.columns}
                name='category'
                onChange={e => props.handleColumnChange(props.name, e)}
            />

        </>
    );
}
function MyVerticallyCenteredModal(props) {
    let modalProps = { show: props.show, onHide: props.onHide };
    return (
        <Modal
            {...modalProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Mapping
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="simpleinput" className="form-label">Tên mặt hàng</label>
                            <DropZoneSelect columns={props.columns} handleColumnChange={props.handleColumnChange} name='product_name' />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="simpleinput" className="form-label">Danh mục</label>
                            <DropZoneSelect columns={props.columns} handleColumnChange={props.handleColumnChange} name='category' />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="simpleinput" className="form-label">Nhà sản xuất</label>
                            <DropZoneSelect columns={props.columns} handleColumnChange={props.handleColumnChange} name='brand' />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="simpleinput" className="form-label">Đơn vị tính</label>
                            <DropZoneSelect columns={props.columns} handleColumnChange={props.handleColumnChange} name='unit' />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="simpleinput" className="form-label">Mô tả</label>
                            <DropZoneSelect columns={props.columns} handleColumnChange={props.handleColumnChange} name='description' />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="simpleinput" className="form-label">Tên biến thể</label>
                            <DropZoneSelect columns={props.columns} handleColumnChange={props.handleColumnChange} name='ver_name' />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="simpleinput" className="form-label">Số hàng tồn</label>
                            <DropZoneSelect columns={props.columns} handleColumnChange={props.handleColumnChange} name='inventory' />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="simpleinput" className="form-label">Giá so sánh</label>
                            <DropZoneSelect columns={props.columns} handleColumnChange={props.handleColumnChange} name='compare' />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="simpleinput" className="form-label">Giá bán</label>
                            <DropZoneSelect columns={props.columns} handleColumnChange={props.handleColumnChange} name='sell' />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="simpleinput" className="form-label">Giá gốc</label>
                            <DropZoneSelect columns={props.columns} handleColumnChange={props.handleColumnChange} name='original' />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="simpleinput" className="form-label">Trạng thái</label>
                            <DropZoneSelect columns={props.columns} handleColumnChange={props.handleColumnChange} name='status' />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={props.handleSubmit}>Submit</Button>

                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


function DropzoneAndModal(props) {
    const [data, setData] = useState(null);
    const [columns, setColumns] = useState([]);
    const [firstTime, setFirstTime] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [mappedColumns, setMappedColumns] = useState({
        product_name: '',
        category: '',
        brand: '',
        unit: '',
        description: '',
        ver_name: '',
        inventory: '',
        sell: '',
        compare: '',
        original: '',
        status: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        firstTime && console.log(errors)
    }, [errors])

    useEffect(() => {
        firstTime && setModalShow(true)
        setFirstTime(true)
        console.log(data)
    }, [data])

    const uploadData = async (data) => {
         toast.promise(
            callApi(apiUpload, data,''),
            {
                pending: 'Đang xử lý...',
                success: 'Thêm thành công',
                error: 'Thêm không thành công'
            }
        )
    }
    const notify = (type, message) => toast[type](message);

    const dataSchema = Yup.array().of(
        Yup.object().shape({
            product_name: Yup.string().required('Cột mặt hàng không được bỏ trống'),
            category: Yup.string().required('Cột danh mục không được bỏ trống'),
            brand: Yup.string().required('Cột nhà sản xuất không được bỏ trống'),
            unit: Yup.string().optional(),
            description: Yup.string().optional(), // Mô tả có thể để trống
            ver_name: Yup.string().required('Cột tên phiên bản không được bỏ trống'),
            inventory: Yup.number().optional().typeError('Hàng tồn phải là kiểu số'),
            sell: Yup.number().required('Cột giá bán phải là số và không được bỏ trống'),
            compare: Yup.number().optional().typeError('Giá so sánh phải là kiểu số'),
            original: Yup.number().optional().typeError('Giá nhập phải là kiểu số'),
            status: Yup.boolean().required().typeError('Trạng thái mặt hàng là 0 hoặc 1'),
        })
    );

    const handleFile = (file) => {
        Papa.parse(file, {
            complete: (result) => {
                const jsonData = result.data;

                setData(jsonData)
            },
            header: true
        });
        Papa.parse(file, {
            complete: (result) => {
                const jsonData = result.data;
                let arr = jsonData[0].map(val => {
                    return { value: val, label: val }
                })
                setColumns(arr)
            },
            header: false
        });

    };
    const handleColumnChange = (originalColumn, event) => {
        setMappedColumns({
            ...mappedColumns,
            [originalColumn]: event.value
        });
    };
    const handleSubmit = async () => {
        const reverseColumns = {}
        Object.keys(mappedColumns).map(mCol => {
            reverseColumns[mappedColumns[mCol]] = mCol
        })

        let dataArr = [];

        data.map(row => {
            const temp_obj = {};
            Object.keys(row).map(val => {
                if (reverseColumns[val])
                    if (reverseColumns[val] === 'status' || reverseColumns[val] === 'original' || reverseColumns[val] === 'compare' || reverseColumns[val] === 'sell' || reverseColumns[val] === 'inventory')
                        return temp_obj[reverseColumns[val]] = Number(row[val])
                    else
                        return temp_obj[reverseColumns[val]] = row[val].trim()

            })

            dataArr.push(temp_obj)
        });

        // uploadData(dataArr)

        try {
            await dataSchema.validate(dataArr, { abortEarly: false });
            setErrors({});
            const result = await uploadData(dataArr)
            if (result.isSuccess) {
                notify('success', 'Thêm dữ liệu thành công!')
                setModalShow(false)
            } else {
                notify('error', result.message)
            }
        } catch (err) {
            if (err.inner) {
                const validationErrors = err.inner.map(error => ({
                    path: error.path,
                    message: error.message,
                }));
                setErrors(validationErrors);
            }
        }

    };
    const onDrop = useCallback(acceptedFiles => {
        handleFile(acceptedFiles[0]);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <div className="dz-message needsclick">
                            <i className="h1 ri-upload-cloud-2-line"></i>
                            <div className='text'>Drop files here or click to upload.</div>

                        </div>
                }
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                columns={columns}
                handleColumnChange={handleColumnChange}
                handleSubmit={handleSubmit}
            />
        </>

    )
}
function Home() {
    const defaultRow = id => ({ id: id, ver_name: '', inventory: 0, original: 0, sell: 0, compare: 0, status: 0 })

    const [dataRows, setDataRows] = useState([
        defaultRow(1)
    ])
    const [mainInfo, setMainInfo] = useState({ product_name: '', category: 1, unit: '', brand: '', description: '' })
    const [colourOptions, setColourOptions] = useState([])
    const [cookies] = useCookies(['user']);

    const notify = (type, message) => toast[type](message);

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = async () => {
        try {
            const response = await callApi(getCategories, '', '')

            let arr = response.message.map(val => {
                return { value: val.id, label: val.category_name }
            })
            setColourOptions(arr)
        } catch (error) {
            console.error('Có lỗi xảy ra khi gửi dữ liệu đến API:', error);
        }
    }

    const updateProduct = (name, val) => {
        setMainInfo({ ...mainInfo, [name]: val })
    }
    const addRow = (defaultNumber) => {
        let state = true;
        if (dataRows.length === 0) {
            return setDataRows([defaultRow(1)])
        } else {
            dataRows.map((val, key) => {
                if (val.id !== defaultNumber) {
                    return setDataRows([...dataRows, defaultRow(defaultNumber)])
                } else {
                    return state = false;
                }
            })
        }
        !state && addRow(defaultNumber + 1)
    }
    const handleChange = (id, name, value) => {
        let updatedRows = []
        updatedRows = dataRows.map(row =>
            row.id === id ? { ...row, [name]: value } : row
        );
        setDataRows(updatedRows);
    }
    const deleteItem = (id) => {
        const updatedItems = dataRows.filter(item => item.id !== id);
        setDataRows(updatedItems);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { ...mainInfo, detail: dataRows }
        try {
            const response = await callApi(postProduct, data, '', cookies)

            if (response.isSuccess) {
                return notify('success', 'Thêm thành công!')
            }else
                return notify('error', response.message)
        } catch (error) {
            console.error('Có lỗi xảy ra khi gửi dữ liệu đến API:', error);
            return notify('error', 'Thêm thất bại!')
        }
    }
    return (
        <>
        <ToastContainer />
            <div className='add-product-page'>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <h4 className="page-title">Thêm sản phẩm</h4>
                    </div>
                </div>
            </div>
            <div className='page-content'>
                <h3 className="form-title">Thêm bằng file</h3>
                    <div className='col-12 right text-sm-end'>
                        <div className='wrap-dropzone'>
                            <DropzoneAndModal cookies={cookies} />
                        </div>
                    </div>
            </div>

            <div className='page-content'>
                <h3 className="form-title">Thông tin mặt hàng</h3>
                <div className='message-bg'>
                    <div className='message-content'>

                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="mb-3">
                                <label htmlFor="simpleinput" className="form-label">Tên mặt hàng<span className='red-star'>*</span></label>
                                <input type="text" name='product_name' onChange={e => updateProduct(e.target.name, e.target.value)} className="form-control" />
                            </div>

                            <div className='row'>
                                <div className='col-4'>
                                    <div className="mb-3">
                                        <label htmlFor="example-select" className="form-label">Danh mục<span className='red-star'>*</span></label>


                                        <SelectComp colourOptions={colourOptions} updateProduct={updateProduct} />
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className="mb-3">
                                        <label htmlFor="simpleinput" className="form-label">Nhà sản xuất</label>
                                        <input type="text" className="form-control" name='brand' onChange={e => updateProduct(e.target.name, e.target.value)} />
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className="mb-3">
                                        <label htmlFor="simpleinput" className="form-label">Đơn vị tính</label>
                                        <input type="text" className="form-control" name='unit' onChange={e => updateProduct(e.target.name, e.target.value)} />
                                        <span className="help-block">
                                            <small>
                                                VD: cái, chiếc, hộp, bộ, hộp 50g, chai/50ml, bộ 2 túi,...
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='col-6'>
                            <div className="mb-3">
                                <label htmlFor="example-textarea" className="form-label">Mô tả mặt hàng</label>
                                <textarea className="form-control" name='description' rows="12" onChange={e => updateProduct(e.target.name, e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>

                    <h3 className="mt-3 form-title">Các phiên bản</h3>
                    <div className="table-responsive mt-3 option">
                        <table className="table table-bordered table-centered mb-0 custom-table">
                            <thead className="table-light">
                                <tr>
                                    <th>Tên biến thể<span className='red-star'>*</span>
                                        <i className="ri-question-line" data-toggle="tooltip" data-placement="top" title="Đặc điểm phân biệt giữa các phiên bản"></i>
                                    </th>

                                    <th className='inventory'>Tồn<i className="ri-question-line" data-toggle="tooltip" data-placement="top" title="Số lượng hàng còn tồn kho"></i></th>

                                    <th className='compare'>Giá so sánh
                                        <i className="ri-question-line" data-toggle="tooltip" data-placement="top" title="Thể hiện giá chưa giảm. Tỉ lệ phần trăm % chênh lệch sẽ được tính tự động"></i>
                                    </th>

                                    <th className="sell">Giá bán<span className='red-star'>*</span>
                                        <i className="ri-question-line" data-toggle="tooltip" data-placement="top" title="Giá bán sản phẩm"></i>
                                    </th>

                                    <th className='original'>Giá gốc<i className="ri-question-line" data-toggle="tooltip" data-placement="top" title="Giá nhập sản phẩm"></i>
                                    </th>

                                    <th className='state'>Trạng thái<span className='red-star'>*</span><i className="ri-question-line" data-toggle="tooltip" data-placement="top" title="Ẩn hoặc hiện sản phẩm"></i>
                                    </th>
                                    <th className='file'>
                                        Ảnh sản phẩm
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className='custom-body'>
                                <CreateRow dataRows={{ ...dataRows }} handleChange={handleChange} deleteItem={deleteItem} />
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="9">
                                        <Link onClick={() => addRow(1)}>Thêm</Link>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="container-fluid mt-3 text-center">
                            <button type="submit" className="btn btn-submit">Lưu sản phẩm</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default Home;

