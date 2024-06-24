import { useState } from "react";

function EQPanel({ changeRating, index }) {
    const [eqValue, setEqValue] = useState("我不知道");
    const [rating, setRating] = useState(50);

    const changeInputValue = () => {
        const value = event.target.value;
        switch (value) {
            case "0":
                setEqValue("很不符合");
                break;
            case "25":
                setEqValue("不太符合");
                break;
            case "50":
                setEqValue("我不知道");
                break;
            case "75":
                setEqValue("比较符合");
                break;
            case "100":
                setEqValue("天呐！这完全就是我")
                break;
        }
        changeRating({ index, value });
        setRating(value);
    }

    return (
        <div className="text-center items-center">
            <div className="h-2"></div>
            <input type="range" min="0" max="100" defaultValue="50" class="range" step="25" data={rating} onChange={changeInputValue} />
            <div className="h-2"></div>
            <div class="w-full flex justify-between text-xs px-2">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
            </div>
            <div className="h-2"></div>
            <h2 className="italic" id="eq-value">{eqValue}</h2>
            <div class="divider"></div>
        </div>
    )
}

export default EQPanel;