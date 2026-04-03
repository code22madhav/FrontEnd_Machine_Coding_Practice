import { useEffect, useState } from "react";
import DropDown from "./DropDownComponent";

const CurrencyConverter=()=>{
    const [currencies,setCurrencies]=useState([]);
    const [fromcurrency, setfromcurrency]=useState();
    const [tocurrency, settocurrency]=useState();
    const [fav,setfav]=useState([]);
    const [amount,setAmount]=useState("");
    const [convertedAmount,setconvertedAmount]=useState('')
    const fetchCurrencies=async()=>{
        const response=await fetch("https://api.frankfurter.dev/v2/currencies");
        const data=await response.json();
        setCurrencies(data);
    }
    useEffect(()=>{
        fetchCurrencies();
    },[])
    useEffect(() => {
        if (currencies?.length > 0) {
            if (!fromcurrency) setfromcurrency(currencies[0].iso_code);
            if (!tocurrency) settocurrency(currencies[1].iso_code); // different default
        }
         // eslint-disable-next-line
    }, [currencies]);
    //https://api.frankfurter.dev/v1/latest?amount=1&from=USD&to=INR
    const toggleFav=(iso_code)=>{
        setfav(prev=>{
            return prev.includes(iso_code)? prev.filter(code=> code!==iso_code):[...prev,iso_code]
        })
    }
    //No need of third var like ordinary expression here react stage all the state update and do it
    //later so it manages internally by holding the values
    const swapcurrencies=()=>{
        setfromcurrency(tocurrency);
        settocurrency(fromcurrency)
    }
    const convert=async()=>{
        try {
            const response=await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromcurrency}&to=${tocurrency}`);
            const data=await response.json();
            setconvertedAmount(data.rates[tocurrency])
        } catch (error) {
            console.log(error)
        }        
    }
    return(<div style={{position:"fixed", top:"50%", left:"50%", 
    transform:"translate(-50%, -50%)", padding:"20px",
    border:"1px solid black", display:"flex", flexDirection:"column"}}>
        <h2>Currency Converter</h2>
        <div style={{display:"flex", justifyContent:"space-between", paddingBottom:"10px"}}>
            <DropDown title={"From"} currencies={currencies} selected={fromcurrency} setselected={setfromcurrency} fav={fav} toggleFav={toggleFav}/>
            <button style={{marginTop:"26px", height:"30px"}} onClick={swapcurrencies}>⇄</button>
            <DropDown  title={"To"} currencies={currencies} selected={tocurrency} setselected={settocurrency} fav={fav} toggleFav={toggleFav}/>
        </div>
        <div style={{display:"flex", flexDirection:"column"}}>
            <label>Amount</label>
            <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
        </div>
        <div>
            <button onClick={convert}>Convert</button>
        </div>
        <div>
            Converted Amount: {convertedAmount}
        </div>
    </div>)
}

export default CurrencyConverter