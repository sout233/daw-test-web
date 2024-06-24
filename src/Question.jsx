import EQPanel from "./EQPanel";

function Question({ title, index, changeRating }) {
    return (
        <div>
            <div className="flex flex-row items-start">
                <h1 className="bold text-xl opacity-50 mr-2">{index+1}</h1>
                <h1 className="bold text-lg">{title}</h1>
            </div>
            <div className="items-center my-2 justify-center"><EQPanel changeRating={changeRating} index={index}></EQPanel></div>
        </div>
    )
}

export default Question;