import { useEffect, useRef, useState } from "react";
/* Styling done here only not made seperate file*/
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top:60px;
`;

const InputBox = styled.input`
  height: 36px;
  width: 36px;
  margin-left: 10px;
  border: 1px solid black;
  background-color: #f5f5f5; /* Light gray instead of 'smoke' */
  text-align: center;
  font-size: 18px;
  border-radius: 4px;
  outline: none;
  font-family: 'DM Sans', sans-serif;

  &:focus {
    border: 2px solid #007BFF; /* Bootstrap blue */
    box-shadow: 0 0 3px #007BFF;
    background-color: white;
  }
`;
//style section end
const InputBoxContainer=()=>{
    const [otpfields, setOtpfields]=useState(new Array(6).fill(""));
    const inputBoxRef=useRef([]);
    useEffect(()=>inputBoxRef.current[0].focus(),[]);
    const handlekeydown=(e,index)=>{
        const key=e.key;
        const copyOtpArray=[...otpfields];
        if(key===" ") return;
        if(key==="Backspace"){
            copyOtpArray[index]="";
            setOtpfields(copyOtpArray);
            if(index>0) inputBoxRef.current[index-1].focus();
            return;
        }
        if(key==="ArrowRight") if(index<5) inputBoxRef.current[index+1].focus();
        if(key==="ArrowLeft") if(index>0) inputBoxRef.current[index-1].focus();
        if(isNaN(key)) return;
        copyOtpArray[index]=key;
        setOtpfields(copyOtpArray);
        if(index<5) inputBoxRef.current[index+1].focus();
    }
    
    
    return(
        <>
        <Container>
            {otpfields.map((item,index)=><InputBox ref={(currentNode)=>inputBoxRef.current[index]=currentNode} key={index} type="text" value={item} onKeyDown={(e)=>handlekeydown(e,index)}/>)}
        </Container>
        </>
    )
}
export default InputBoxContainer;