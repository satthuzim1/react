import { React, useEffect, useState, Fragment, useCallback } from 'react';
import { getProductWithToken, apiDeleteProduct, apiUpload, excell, callApi, postExcel } from '../js/api';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

function AddExcel() {
    const [data, setData] = useState([{ day: '', c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', date: '' }])

    useEffect(() => {
        console.log(data)
    }, [data])

    const handleChange = (index, field, value) => {
        const newRows = [...data];
        newRows[index][field] = value;
        setData(newRows);
    };

    const handleAddRow = () => {
        setData([...data, { day: '', c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', date: '' }]);
    };

    const handleRemoveRow = (index) => {
        const newRows = data.filter((_, i) => i !== index);
        setData(newRows);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const re = await callApi(postExcel, data, '', '')

        console.log('Submitted data:', re);
        // Gửi dữ liệu lên server ở đây nếu cần
    };
    return (
        <>
            <h1>Thêm dữ liệu</h1>
            <Form id="userInfo" className='mb-3' onSubmit={handleSubmit}>
                <Table bordered responsive className='product-list' style={{ marginTop: '15px' }}>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Cột 1</th>
                            <th>Cột 2</th>
                            <th>Cột 3</th>
                            <th>Cột 4</th>
                            <th>Cột 5</th>
                            <th>Cột 6</th>
                            <th>Ngày</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <input type='number' name='day' value={row.day} className='form-control' onChange={(e) => handleChange(index, 'day', e.target.value)} />
                                </td>
                                <td>
                                    <input type='number' name='c1' value={row.c1} className='form-control' onChange={(e) => handleChange(index, 'c1', e.target.value)} />
                                </td>
                                <td>
                                    <input type='number' name='c2' value={row.c2} className='form-control' onChange={(e) => handleChange(index, 'c2', e.target.value)} />
                                </td>
                                <td>
                                    <input type='number' name='c3' value={row.c3} className='form-control' onChange={(e) => handleChange(index, 'c3', e.target.value)} />
                                </td>
                                <td>
                                    <input type='number' name='c4' value={row.c4} className='form-control' onChange={(e) => handleChange(index, 'c4', e.target.value)} />
                                </td>
                                <td>
                                    <input type='number' name='c5' value={row.c5} className='form-control' onChange={(e) => handleChange(index, 'c5', e.target.value)} />
                                </td>
                                <td>
                                    <input type='number' name='c6' value={row.c6} className='form-control' onChange={(e) => handleChange(index, 'c6', e.target.value)} />
                                </td>
                                <td>
                                    <input type='date' name='date' value={row.date} className='form-control' onChange={(e) => handleChange(index, 'date', e.target.value)} />
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(index)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="9">
                                <button type="button" onClick={handleAddRow}>+ Thêm dòng</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div style={{ marginTop: '10px' }}>
                    <button type="submit" style={{ marginLeft: '10px' }}>Gửi form</button>
                </div>
            </Form>
        </>
    )
}
export default AddExcel