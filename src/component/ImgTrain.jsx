import { React, useEffect, useState, Fragment, useCallback } from 'react';
import { useSearchParams } from "react-router-dom";
import { apiGetImg, callApi } from '../js/api';
import { Box, CircularProgress } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import Paper from '@mui/material/Paper';

function ImgTrain() {
    const [searchParams] = useSearchParams();
    const [imgArr, setImgArr] = useState([])
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const size = 20;
    useEffect(() => {
        fetchApi()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight
            ) {
                fetchApi();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [page, loading]);

    const fetchApi = async () => {
        const tag = searchParams.get("tag");
        if (!hasMore) return;
        setLoading(true);
        const result = await callApi(apiGetImg, "", "?page=" + page + "&size=" + size + "&tag=" + tag)
        if (result.isSuccess === true && result.message.lengh !== 0) {
            setImgArr(prev => [...prev, ...result.message.data])
        }
        setPage((prev) => prev + 1);
        setLoading(false);
        setHasMore((page + 1) * size < result.message.total);

    }
    return (
        <>
            <div className='img-only-container '>
                <Box sx={{ minHeight: 400 }}>
                    <Masonry columns={4} spacing={2}>
                        {imgArr && imgArr.length !== 0 && imgArr.map((val, index) => (
                            <Paper key={index} sx={{ overflow: 'hidden' }}>
                                <img src={val} />
                            </Paper>
                        ))}
                    </Masonry>
                    {loading && (
                        <Box sx={{ textAlign: "center", p: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}
                </Box>
            </div>
        </>
    )
}
export default ImgTrain