import { useState, useEffect } from "react";
import Card from "./Card"
const Pagination = () => {
    const [currpage, setCurrPage] = useState(0);
    const [data, setData] = useState();
    const [slicedArr, setslicedArr] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const prevThree = Array.from({ length: 3 }, (_, i) => currpage - 1 - i).filter(n => n > 0).reverse();  //Logic: Page-1, Page-2, Page-3
    const nextThree = Array.from({ length: 3 }, (_, i) => currpage + i).filter(m=>m<pageCount);
    const pageinationArray = [...prevThree, ...nextThree];
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://dummyjson.com/products/search?q=phone");
            const resdata = await res.json();
            setData(resdata.products);
            setPageCount(Math.round(resdata.products.length / 5));
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (!data) return;
        setslicedArr(data.slice(currpage * 5, currpage * 5 + 5));
    }, [currpage, data]);
    const handlePrevClick=()=>{
        if (currpage > 1) { setCurrPage((p) => p - 1) }
    }
    const handleNextClick=()=>{
        if (currpage < pageCount-1) { setCurrPage((p) => p + 1) }
    }
    const handlePageSet=(pageNo)=>{
        if(pageNo>pageCount) return;
        setCurrPage(pageNo);
    }
    return (
        <>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {slicedArr && slicedArr.map((m) => <Card key={m.id} name={m.title} />)}
            </div>
            <button onClick={handlePrevClick}>Prev</button>
            {data && pageinationArray.map((m, i) => <button key={i} onClick={()=>handlePageSet(m)}>{m}</button>)}
            <button onClick={handleNextClick}>Next</button>
        </>
    )
}

export default Pagination;