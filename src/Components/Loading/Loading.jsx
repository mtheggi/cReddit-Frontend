import LoadingGift from '../../assets/Loading.gif';
import RedditLogo from '../../assets/reddit_logo.svg';
const Loading = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <img src={RedditLogo} alt="Reddit Logo" className="h-15 w-15" />
            <img src={LoadingGift} alt="Loading" className='h-10 w-15' />
        </div>
    );
}

export default Loading;