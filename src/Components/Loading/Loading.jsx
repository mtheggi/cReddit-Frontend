
import LoadingGift from '../../assets/Loading.gif';
import RedditLogo from '../../assets/reddit_logo.png';
import { useLocation } from 'react-router-dom';
/**
 * Loading component displays a loading animation with the Reddit logo.
 * @component
 * @returns {JSX.Element} The loading component.
 */
const Loading = () => {
    return (
        <div className={`w-full -mb-8 h-full flex flex-col items-center justify-center`}>
            <img src={RedditLogo} alt="Reddit Logo" className=" w-14 rounded-full" />
            <img src={LoadingGift} alt="Loading" className='h-8 w-17' />
        </div>
    );
}

export default Loading;