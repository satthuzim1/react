import { React, useEffect, useState, Fragment, useCallback } from 'react';
import { getProductWithToken, apiDeleteProduct, apiUpload, excell, callApi } from '../js/api';
import Table from 'react-bootstrap/Table';

function Excell() {
    const [resultLength, setResultLength] = useState(0)
    const [unitNumber1, setUnitNumber1] = useState([])
    const [unitNumber2, setUnitNumber2] = useState([])
    const [unitNumber3, setUnitNumber3] = useState([])
    const [unitNumber4, setUnitNumber4] = useState([])
    const [unitNumber5, setUnitNumber5] = useState([])
    const [unitNumber6, setUnitNumber6] = useState([])

    const [colOne, setColOne] = useState([])
    const [colTwo, setColTwo] = useState([])
    const [colThree, setColThree] = useState([])
    const [colFour, setColFour] = useState([])
    const [colFive, setColFive] = useState([])
    const [colSix, setColSix] = useState([])

    const [minColOne, setMinColOne] = useState(0)
    const [minColTwo, setMinColTwo] = useState(0)
    const [minColThree, setMinColThree] = useState(0)
    const [minColFour, setMinColFour] = useState(0)
    const [minColFive, setMinColFive] = useState(0)
    const [minColSix, setMinColSix] = useState(0)

    const [maxColOne, setMaxColOne] = useState(0)
    const [maxColTwo, setMaxColTwo] = useState(0)
    const [maxColThree, setMaxColThree] = useState(0)
    const [maxColFour, setMaxColFour] = useState(0)
    const [maxColFive, setMaxColFive] = useState(0)
    const [maxColSix, setMaxColSix] = useState(0)

    const [odd, setOdd] = useState(0)
    const [oddC2, setOddC2] = useState(0)
    const [oddC3, setOddC3] = useState(0)
    const [oddC4, setOddC4] = useState(0)
    const [oddC5, setOddC5] = useState(0)
    const [oddC6, setOddC6] = useState(0)

    const [numberInCol, setNumberInCol] = useState({})
    const [numberInCol2, setNumberInCol2] = useState({})
    const [numberInCol3, setNumberInCol3] = useState({})
    const [numberInCol4, setNumberInCol4] = useState({})
    const [numberInCol5, setNumberInCol5] = useState({})
    const [numberInCol6, setNumberInCol6] = useState({})

    //thong ke so hang chuc o trong cot
    useEffect(() => {
        getResult(colOne, setUnitNumber1)
        getResult(colTwo, setUnitNumber2)
        getResult(colThree, setUnitNumber3)
        getResult(colFour, setUnitNumber4)
        getResult(colFive, setUnitNumber5)
        getResult(colSix, setUnitNumber6)

        getOdd(colOne, setOdd)
        getOdd(colTwo, setOddC2)
        getOdd(colThree, setOddC3)
        getOdd(colFour, setOddC4)
        getOdd(colFive, setOddC5)
        getOdd(colSix, setOddC6)


    }, [colOne])

    const getOdd = (col, callBack) => {
        //lay% so le tung cot
        let odd = [];
        let smallest = 0;
        for (let i = 0; i < col.length; i++) {
            if (col[i] % 2 !== 0) {
                odd.push(col[i])
            }
        }
        smallest = odd.length / col.length * 100
        callBack(smallest.toFixed(2))
    }

    const getResult = (col, callBack) => {
        let all = [];
        let nine = [];
        let nineTeen = [];
        let twentyNine = [];
        let thirtyNine = [];
        let fourTy = [];


        for (let i = 0; i < col.length; i++) {
            all.push(col[i])
            let zero = 0;
            let one = 0;
            let two = 0;
            let three = 0;
            let four = 0;


            if (col[i] >= 1 && col[i] < 10) {
                nine.push(col[i])
            } else if (col[i] > 9 && col[i] < 20) {
                nineTeen.push(col[i])
            } else if (col[i] > 19 && col[i] < 30) {
                twentyNine.push(col[i])

            } else if (col[i] > 29 && col[i] < 40) {
                thirtyNine.push(col[i])

            } else if (col[i] > 39) {
                fourTy.push(col[i])
            }

            zero = (nine.length / all.length * 100).toFixed(2)
            one = (nineTeen.length / all.length * 100).toFixed(2)
            two = (twentyNine.length / all.length * 100).toFixed(2)
            three = (thirtyNine.length / all.length * 100).toFixed(2)
            four = (fourTy.length / all.length * 100).toFixed(2)

            callBack({ '0x': zero, '10x': one, '20x': two, '30x': three, '40x': four })

        }

    }

    const numberOnCol = (data, defaultCol, callBack, callBack1, callBack2, min, max) => {
        let key = `c${defaultCol}`
        const counter = {};
        let max_temp = 0;
        let min_temp = 1;
        for (let i = 0; i < data.length; i++) {
            const value = data[i][key];
            counter[value] = (counter[value] || 0) + 1;
            if(counter[value] >= max_temp) max_temp = counter[value] 
            if(counter[value] <= min_temp) min_temp = counter[value] 
        }
        callBack2(max_temp)
        callBack1(min_temp)
        callBack(counter)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const result = await callApi(excell, '', '', '')
        separateToArr(result)
        setResultLength(result.length)
        numberOnCol(result, 1, setNumberInCol, setMinColOne, setMaxColOne, minColOne, maxColOne)
        numberOnCol(result, 2, setNumberInCol2, setMinColTwo, setMaxColTwo, minColTwo, maxColTwo)
        numberOnCol(result, 3, setNumberInCol3, setMinColThree, setMaxColThree, minColThree, maxColThree)
        numberOnCol(result, 4, setNumberInCol4, setMinColFour, setMaxColFour, minColFour, maxColFour)
        numberOnCol(result, 5, setNumberInCol5, setMinColFive, setMaxColFive, minColFive, maxColFive)
        numberOnCol(result, 6, setNumberInCol6, setMinColSix, setMaxColSix, minColSix, maxColSix)
    }

    const separateToArr = (arr) => {
        let tempCoilOne = []
        let tempCoilTwo = []
        let tempCoilThree = []
        let tempCoilFour = []
        let tempCoilFive = []
        let tempCoilSix = []

        for (const val of Object.keys(arr)) {
            tempCoilOne.push(arr[val]['c1'])
            tempCoilTwo.push(arr[val]['c2'])
            tempCoilThree.push(arr[val]['c3'])
            tempCoilFour.push(arr[val]['c4'])
            tempCoilFive.push(arr[val]['c5'])
            tempCoilSix.push(arr[val]['c6'])
        }
        setColOne(tempCoilOne)
        setColTwo(tempCoilTwo)
        setColThree(tempCoilThree)
        setColFour(tempCoilFour)
        setColFive(tempCoilFive)
        setColSix(tempCoilSix)
    }

    const lamTronSo = (number) => {
        if (number) {
            return (number / resultLength * 100).toFixed(2)
        }
    }


    const Board3 = () => {
        const elements = [];
        for (let i = 1; i <= 45; i++) {
            elements.push(<tr key={i}>
                <td>{i}</td>
                <td >{lamTronSo(numberInCol[i])} {numberInCol[i] === minColOne && 'Min'} {numberInCol[i] === maxColOne && 'Max'}</td>
                <td >{lamTronSo(numberInCol2[i])} {numberInCol2[i] === minColTwo && 'Min'} {numberInCol2[i] === maxColTwo && 'Max'}</td>
                <td >{lamTronSo(numberInCol3[i])} {numberInCol3[i] === minColThree && 'Min'} {numberInCol3[i] === maxColThree && 'Max'}</td>
                <td >{lamTronSo(numberInCol4[i])} {numberInCol4[i] === minColFour && 'Min'} {numberInCol4[i] === maxColFour && 'Max'}</td>
                <td >{lamTronSo(numberInCol5[i])} {numberInCol5[i] === minColFive && 'Min'} {numberInCol5[i] === maxColFive && 'Max'}</td>
                <td >{lamTronSo(numberInCol6[i])} {numberInCol6[i] === minColSix && 'Min'} {numberInCol6[i] === maxColSix && 'Max'}</td>
            </tr>
            )

        }
        return elements
    }
    return (
        <>
            <Table bordered responsive className='product-list' style={{ marginTop: '15px' }}>

                <thead>
                    <tr>
                        <th></th>
                        <th>Hàng đơn vị</th>
                        <th>Hàng 1x</th>
                        <th>Hàng 2x</th>
                        <th>Hàng 3x</th>
                        <th>Hàng 4x</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Cột 1
                        </td>
                        {
                            Object.keys(unitNumber1).map((val, index) => (
                                <td key={index}>
                                    {unitNumber1[val]}
                                </td>
                            ))
                        }
                    </tr>
                    <tr>
                        <td>
                            Cột 2
                        </td>
                        {
                            Object.keys(unitNumber2).map((val, index) => (
                                <td key={index}>
                                    {unitNumber2[val]}
                                </td>
                            ))
                        }
                    </tr>
                    <tr>
                        <td>
                            Cột 3
                        </td>
                        {
                            Object.keys(unitNumber3).map((val, index) => (
                                <td key={index}>
                                    {unitNumber3[val]}
                                </td>
                            ))
                        }
                    </tr>
                    <tr>
                        <td>
                            Cột 4
                        </td>
                        {
                            Object.keys(unitNumber4).map((val, index) => (
                                <td key={index}>
                                    {unitNumber4[val]}
                                </td>
                            ))
                        }
                    </tr>
                    <tr>
                        <td>
                            Cột 5
                        </td>
                        {
                            Object.keys(unitNumber5).map((val, index) => (
                                <td key={index}>
                                    {unitNumber5[val]}
                                </td>
                            ))
                        }
                    </tr>
                    <tr>
                        <td>
                            Cột 6
                        </td>
                        {
                            Object.keys(unitNumber6).map((val, index) => (
                                <td key={index}>
                                    {unitNumber6[val]}
                                </td>
                            ))
                        }
                    </tr>
                </tbody>
            </Table>

            <h1>% số lẻ từng cột</h1>
            <Table bordered responsive className='product-list'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Cột 1</th>
                        <th>Cột 2</th>
                        <th>Cột 3</th>
                        <th>Cột 4</th>
                        <th>Cột 5</th>
                        <th>Cột 6</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tỉ lệ lẻ</td>
                        <td>
                            {odd}
                        </td>
                        <td>
                            {oddC2}
                        </td>
                        <td>
                            {oddC3}
                        </td>
                        <td>
                            {oddC4}
                        </td>
                        <td>
                            {oddC5}
                        </td>
                        <td>
                            {oddC6}
                        </td>
                    </tr>
                </tbody>
            </Table>

            <h1>Tỉ lệ số từng cột</h1>
            <Table bordered responsive className='product-list'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Cột 1</th>
                        <th>Cột 2</th>
                        <th>Cột 3</th>
                        <th>Cột 4</th>
                        <th>Cột 5</th>
                        <th>Cột 6</th>
                    </tr>
                </thead>
                <tbody>
                    <Board3 />

                </tbody>
            </Table>

        </>
    )
}

export default Excell