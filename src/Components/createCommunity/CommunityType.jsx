
import propTypes from "prop-types";

const CommunityType = ({ type, typeDescription, children, handleRadioChange }) => {
    return (

        <div className="commuity-type flex flex-row px-3 py-3 items-center justify-between hover:bg-reddit_search rounded-xl">
            <div className="flex flex-row">
                {children}
                <span className="flex flex-col justify-center">
                    <p className="text-sm">{type}</p>
                    <p className="text-xs">{typeDescription}</p>
                </span>
            </div>

            <input type="radio" className="h-5 w-5" id={`${type}-community-type`} name="Type" onChange={handleRadioChange} />

        </div>



    );

}
CommunityType.propTypes = {
    type: propTypes.string,
    typeDescription: propTypes.string,
    children: propTypes.node,
    handleRadioChange: propTypes.func

}

export default CommunityType;