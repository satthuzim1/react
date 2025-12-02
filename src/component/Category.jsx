import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { ProductListUi } from "../component/HomeContent"
import ReactPaginate from 'react-paginate';
import { getProduct, callApi } from '../js/api';

export const PaginatedItems = (props)=>  {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.

    const pageCount = Math.ceil(props.total / props.itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        // const newOffset = (event.selected * props.itemsPerPage) % props.total;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        props.changeLimit([event.selected*props.itemsPerPage, props.itemsPerPage])
    };

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

function Category() {
    let { categoryId, categoryName } = useParams();
    let [listBrand, setListBrand] = useState([])
    let [listProduct, setListProduct] = useState([])
    const [checkedItems, setCheckedItems] = useState([]); // Trạng thái lưu trữ các checkbox được chọn
    const [firstFetch, setFirstFetch] = useState(true)

    const [totalItem, setTotalItem] = useState(0) 
    const itemsPerPage = 20;
    const [limit, setLimit] = useState([0, itemsPerPage])

    useEffect(() => {
        async function fetchData() {
            let url = ``;
            let response =''
            try {
                if (checkedItems.length > 0) {
                    response = await callApi(getProduct,'','?type=2&page='+limit[0]+'&pageSize='+limit[1]+'&cate='+categoryId+'&brand='+checkedItems.join(','))
                } else {
                    response = await callApi(getProduct, '', '?type=0&page='+limit[0]+'&pageSize='+limit[1]+'&cate='+categoryId)
                };
                // !result.isSuccess && handleSet(<>Loading failed</>)
                setListProduct(response.message.data)
                setTotalItem(response.message.totalRows)
                firstFetch && getBrand(response.message.brands)
                setFirstFetch(false)
            } catch (e) {
                console.error("E: ")
            }
        }
        fetchData()
    }, [checkedItems, limit])

    const getBrand = (arr) => {
        arr = arr.map(val => {
            return val.brand
        })
        setListBrand(arr)
    }

    const handleCheckboxChange = (event) => {
        setLimit([0, itemsPerPage])
        const { name, checked } = event.target;
        if (checked)
            setCheckedItems([...checkedItems, name])
        else {
            let arr = checkedItems.filter((element, key) => element !== name)
            setCheckedItems(arr)
        }
    };


    return (
        <div className='search-for'>
            <div className='page-title'>
                <span>Tìm kiếm theo: {categoryName}</span>
            </div>
            <div className='category-product'>
                <div className='left'>
                    <div className='brand'>
                        <p>Thương hiệu</p>
                        <Form>
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="flex-column">
                                    {listBrand && listBrand.map((val, key) => (
                                        <Form.Check key={key}
                                            inline
                                            label={val}
                                            name={val}
                                            type={type}
                                            id={`inline-${type}-${key}`}
                                            onChange={handleCheckboxChange}
                                        />
                                    ))}
                                </div>
                            ))}
                        </Form>
                    </div>
                    <div className="splitter"></div>
                    <div className='price'>
                        {/* <Form>
                            {['checkbox', 'radio'].map((type) => (
                                <div key={`inline-${type}`} className="flex-column">
                                    <Form.Check
                                        inline
                                        label="1"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                    />
                                    <Form.Check
                                        inline
                                        label="2"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                </div>
                            ))}
                        </Form> */}
                    </div>
                    <div className='color'>

                    </div>
                    <div className='seller'>

                    </div>
                    <div className='location'>

                    </div>
                </div>
                <div className='right'>
                    <div className='top-title'>

                    </div>
                    <div className='product-list'>
                        <ProductListUi arr={listProduct} />
                    </div>
                    {totalItem > itemsPerPage && (<div className='wrap-paginate'>
                        <PaginatedItems itemsPerPage={itemsPerPage} items={listProduct} changeLimit={setLimit} total={totalItem} />
                    </div>)}
                    
                </div>
            </div>
        </div>
    )
}
export default Category;