
/**
 * Renders a separator component.
 *
 * @returns {JSX.Element} The separator component.
 */
const Separator = ({color}) => {
    return (
        <>
            <div className="w-full mt-0 bg-reddit_greenyDark Separator" >
                <hr className={`border-t-1 border-gray-300 ${color?`border-gray-${color}`:'border-gray-300'}`} />
            </div>
        </>
    );
}

export default Separator;