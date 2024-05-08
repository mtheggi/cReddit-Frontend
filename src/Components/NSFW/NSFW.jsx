
import Plus18 from "./Plus18";
import { useNavigate } from "react-router-dom";
const NSFW = ({ setOver18 }) => {
    const navigate = useNavigate();
    return (

        <div className="w-1/2 flex h-70 flex-col -mt-10 justify-between items-center max-w-[520px] text-left text-white">

            <div className="h-16 w-16 mb-3"><Plus18 /></div>
            <h1 className="m-3 font-bold text-24" > Mature Content </h1>
            <p className="text-14 mb-3 mt-0">This page may contain mature or adult content. To continue, confirm you’re over 18 and we’ll update your settings to show mature content.</p>
            <p className="w-full text-14 font-normal mb-2">
                After continuing, you can visit your settings at any time to hide mature content again.
            </p>
            <div className="w-full flex flex-col xs:flex-col md:flex-row justify-evenly items-center mt-5">
                <button id="NSFW-go-home" data-testid="NSFW-go-home" onClick={() => { navigate("/") }} className="mb-2 w-40 h-10 bg-reddit_search text-white rounded-3xl font-bold">Go to Home</button>
                <button id="NSFW-over18" data-testid="NSFW-go-home" onClick={() => setOver18(false)} className="mb-2 w-40 h-10 bg-reddit_blue text-white rounded-3xl font-bold">Yes, I am over 18 </button>
            </div>
        </div>
    );

}
export default NSFW;