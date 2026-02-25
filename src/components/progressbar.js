import { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
//styling
const Container=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const ProgressBarBox=styled.div`
  width: 500px;
  height: 20px;
  border: 1px solid black;
  border-radius: 20px;
  overflow: hidden;
  position:relative;
`
const PercentageSpan=styled.span`
  position: absolute;
  width:100%;
  display: flex;
  justify-content: center;
  align-item:center;
  z-index:1;
`
const ProgressDiv=styled.div`
  height: 100%;
  background-color: green;
`

//styleing ends
const ProgressBar = ({ value = 0 }) => {
  const [percentage, setPercentage] = useState(value);
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPercentage((prev) => {
        if(prev>=100){
          clearInterval(timerRef.current);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [value]);
  return (
    <Container>
      <span>Progress Bar</span>
      <ProgressBarBox>
        <PercentageSpan style={{color:percentage>49? 'white':'black'}}>
          {percentage}%
        </PercentageSpan>
        <ProgressDiv style={{transform: `scaleX(${percentage/100})`, transformOrigin:"left"}}/>
      </ProgressBarBox>
    </Container>
  );
};

export default ProgressBar;
