import { React, useEffect, useState } from 'react';
import '../icon.min.css'
import Chart from 'react-apexcharts'
import Card from 'react-bootstrap/Card';
import { getProduct, useApi } from '../js/api';

function AdminHomeContent() {
    const [chart, setChart] = useState({})
    const [chart2, setChart2] = useState({})
    const [data, setData] = useState([])

    const fetchData = async ()=>{
        try {
            // const response = await useApi(getProduct,'','')
            // if (!response.ok) {
            //     throw new Error("failed to login");
            // }
        //    console.log(response)
        } catch (e) {
            console.error("E: ", e.message)
        }
    }
    useEffect(() => {

        // const interval = setInterval(() => {
            fetchData()
        //     // Thêm phần tử mới vào mảng
        //   }, 1000); // Thêm một phần tử mỗi giây
      
        
        setChart2({
            series: [{
                data: data
            }],
            options: {
                chart: {
                    id: 'realtime',
                    height: 350,
                    type: 'line',
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: 1000
                        }
                    },
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'Ram Chart',
                    align: 'left'
                },
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'category',
                    range: 20,
                    labels: {
                        datetimeFormatter: {
                            second: 'HH:mm:ss' // Định dạng thời gian là giờ:phút:giây
                          }
                    }
                  },
                yaxis: {
                    max: 100,
                    min: 0
                },
                legend: {
                    show: false
                },
            },

        })

        // return () => clearInterval(interval); 
}, [data])


useEffect(() => {
    updateChart({
        chart: {

            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: [{
            name: 'sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }, {
            name: 'qwe',
            data: [15, 23, 45, 30, 35, 50, 50, 80, 100]
        }],
    })
}, [])

const updateChart = (val) => {
    setChart(val)
}

return (
    <>
        <div className="row">
            <div className="col-12">
                <div className="page-title-box">
                    <h4 className="page-title">Dashboard</h4>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-5 col-lg-6">
                <div className="row">
                    <div className="col-sm-6">
                        <Card className='card widget-flat'>
                            <Card.Body>
                                <div className="float-end">
                                    <i className="mdi mdi-account-multiple widget-icon"></i>
                                </div>
                                <h5 className="text-muted fw-normal mt-0" title="Number of Customers">Tổng nợ cần
                                    trả</h5>
                                <h3 className="mt-3 mb-3">36,254</h3>
                                <p className="mb-0 text-muted">
                                    <span className="text-success me-2"><i className="mdi mdi-arrow-up-bold"></i> 5.27%</span>
                                    <span className="text-nowrap">Since last month</span>
                                </p>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-sm-6">
                        <div className="card widget-flat">
                            <div className="card-body">
                                <div className="float-end">
                                    <i className="mdi mdi-cart-plus widget-icon"></i>
                                </div>
                                <h5 className="text-muted fw-normal mt-0" title="Number of Orders">Tổng nợ cần thu
                                    hồi</h5>
                                <h3 className="mt-3 mb-3">5,543</h3>
                                <p className="mb-0 text-muted">
                                    <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 1.08%</span>
                                    <span className="text-nowrap">Since last month</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card widget-flat">
                            <div className="card-body">
                                <div className="float-end">
                                    <i className="mdi mdi-currency-usd widget-icon"></i>
                                </div>
                                <h5 className="text-muted fw-normal mt-0" title="Average Revenue">Tổng thu nhập</h5>
                                <h3 className="mt-3 mb-3">$6,254</h3>
                                <p className="mb-0 text-muted">
                                    <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 7.00%</span>
                                    <span className="text-nowrap">Since last month</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card widget-flat">
                            <div className="card-body">
                                <div className="float-end">
                                    <i className="mdi mdi-pulse widget-icon"></i>
                                </div>
                                <h5 className="text-muted fw-normal mt-0" title="Growth">Tổng chi tiêu</h5>
                                <h3 className="mt-3 mb-3">+ 30.56%</h3>
                                <p className="mb-0 text-muted">
                                    <span className="text-success me-2"><i className="mdi mdi-arrow-up-bold"></i> 4.87%</span>
                                    <span className="text-nowrap">Since last month</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-xl-7 col-lg-6'>
                <div className='bg-chart'>
                    {Object.keys(chart).length !== 0 && <Chart className='week-chart' options={chart.chart} series={chart.series} type="bar" height={'300px'}/>}
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='col-12'>
                <div className='bg-chart'>
                    {Object.keys(chart).length !== 0 && <Chart className='week-chart' options={chart2.options} series={chart2.series} type="line" height={'300px'}/>}

                </div>
            </div>
        </div>
    </>
);
}
export default AdminHomeContent;

