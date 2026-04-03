const DropDown = ({ title, currencies, selected, setselected, toggleFav, fav }) => {
    const isFav = fav?.includes(selected);
    /*Note: You can se we have passed value in the select tag as well this makes the select tag as 
    controlled component in react this helps to get the current selection made at that time
    */
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label>{title}</label>
            <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                <select style={{
                    padding: "4px 16px 4px 6px",
                    border: "1px solid #999",
                    height: "30px",
                }}
                    value={selected}
                    onChange={(e)=>setselected(e.target.value)}
                >
                    {fav?.map(m=><option value={m} key={m}>{m}</option>)}
                    <hr style={{padding:"3px 0"}}/>
                    {currencies?.map(m => (
                        <option value={m.iso_code} key={m.iso_code}>{m.iso_code}</option>
                    ))}
                </select>
                <input
                    type="checkbox"
                    checked={isFav} 
                    style={{
                        position: "absolute",
                        right: "19px",
                        width: "13px",
                        height: "13px",
                        cursor: "pointer",
                        margin: "0",
                    }}
                    onChange={()=>toggleFav(selected)}
                />
            </div>
        </div>
    );
};

export default DropDown;