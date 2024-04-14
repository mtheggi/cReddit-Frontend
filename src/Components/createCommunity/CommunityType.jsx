
import propTypes from "prop-types";
/**
 * Renders a community type component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.type - The type of the community.
 * @param {string} props.typeDescription - The description of the community type.
 * @param {ReactNode} props.children - The child components.
 * @param {function} props.handleRadioChange - The event handler for radio button change.
 * @param {boolean} props.isChecked - Indicates whether the radio button is checked.
 * @returns {JSX.Element} The rendered component.
 */
const CommunityType = ({ type, typeDescription, children, handleRadioChange, isChecked }) => {
    return (

        <div className="commuity-type flex flex-row px-3 py-3 items-center justify-between hover:bg-reddit_search rounded-xl">
            <div className="flex flex-row">
                {children}
                <span className="flex flex-col mr-3 justify-center">
                    <p className="text-sm">{type}</p>
                    <p className="text-xs">{typeDescription}</p>
                </span>
            </div>

            <input type="radio" className="h-5 w-5 focus:ring-0 cursor-pointer" id={`${type}-community-type`} name="Type" onChange={handleRadioChange} checked={isChecked} />

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