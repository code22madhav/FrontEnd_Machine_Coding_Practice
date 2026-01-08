import { useEffect, useState } from "react";
const EMI_CALCULATOR = () => {
  const [assetCost, setAssetCost] = useState();
  const [intrestRate, setIntrestRate] = useState();
  const [processingFee, setProcessingFee] = useState();
  const [downpayment, setDownPayment] = useState();
  const [emi, setEmi] = useState(0);
  const months = [12, 24, 36, 48, 60];
  const [tenure, SetTenure] = useState(12);
  const onChangeHandler = (e) => {
    if (e.target.name === "cost") setAssetCost(e.target.value);
    if (e.target.name === "intrest") setIntrestRate(e.target.value);
    if (e.target.name === "processing") setProcessingFee(e.target.value);
  };
  const calculateEMI = (dp) => {
    const p = Number(assetCost) - dp;
    const n = tenure / 12;
    const r = Number(intrestRate) / 100;
    const emi_amount = [p * r * (1 + r) ** n] / [(1 + r) ** n - 1];
    const monthlyEMI = (emi_amount / 12).toFixed(0);
    return monthlyEMI;
  };
  const updateEMI = (e) => {
    if (!assetCost || !processingFee || !intrestRate) return;
    const dp = Number(e.target.value);
    setDownPayment(dp);
    setEmi(calculateEMI(dp));
  };
  const calculateDp = (emi) => {
    const dppercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((dppercent / 100) * assetCost).toFixed(0);
  };
  const updateDp = (e) => {
    if (!assetCost || !processingFee || !intrestRate) return;
    const emi = Number(e.target.value);
    setEmi(emi);
    setDownPayment(calculateDp(emi));
  };
  useEffect(() => {
    if (!assetCost || !processingFee || !intrestRate) return;
    setEmi(calculateEMI(downpayment));
  }, [tenure, assetCost]);
  return (
    <>
      <div style={{width:"400px", margin:" 0 auto"}}>
        <h2>EMI Calculator</h2>
        <label>Total Cost of Asset</label>
        <input
          name="cost"
          placeholder="Total cost of Asset"
          value={assetCost}
          onChange={(e) => onChangeHandler(e)}
        />
        <label><br/>Intrest Rate (in %)</label>
        <input
          name="intrest"
          placeholder="Intrest Rate"
          value={intrestRate}
          onChange={(e) => onChangeHandler(e)}
        />
        <label><br/>Processing Fee (in %)</label>
        <input
          name="processing"
          placeholder="Processing Fee"
          value={processingFee}
          onChange={(e) => onChangeHandler(e)}
        />
        <label>
          <br/>
          DownPayment:
          {assetCost &&
            processingFee &&
            intrestRate &&
            (
              Number(downpayment) +
              (Number(assetCost) - Number(downpayment)) *
              (Number(processingFee) / 100)
            ).toFixed(0)}
        </label>
        <div>
          <input
            style={{ width: "100%" }}
            name="downpayment"
            min={0}
            max={assetCost}
            type="range"
            value={downpayment}
            onChange={(e) => updateEMI(e)}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>0%</label>
            <label>{downpayment}</label>
            <label>100%</label>
          </div>
        </div>
        <label>Loan Per Month:{emi}</label>
        <label>Total Loan Amount: {Number(emi * tenure).toFixed(0)}</label>
        <div>
          <input
            style={{ width: "100%" }}
            name="emi"
            min={calculateEMI(assetCost)}
            max={calculateEMI(0)}
            type="range"
            value={emi}
            onChange={(e) => updateDp(e)}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {assetCost && intrestRate ? (
              <label>{calculateEMI(assetCost)}</label>
            ) : (
              0
            )}
            <lable>{emi}</lable>
            {assetCost && intrestRate ? <label>{calculateEMI(0)}</label> : 0}
          </div>
        </div>
        <label>Tenure</label>
        <div>
          {months.map((m, i) => (
            <button
              key={i}
              style={{ background: tenure === m ? "lightblue" : "" }}
              onClick={() => {
                SetTenure(m);
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default EMI_CALCULATOR;
