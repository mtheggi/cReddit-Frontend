
import { Link } from 'react-router-dom';
import ErrorImg1 from '../assets/reddit404a.png';
import ErrorImg2 from '../assets/reddit404b.png';
import ErrorImg3 from '../assets/reddit404d.png';
import ErrorImg4 from '../assets/reddit404e.png';
import { useEffect } from 'react';

const NotFound = ({ isNotFound, setIsNotFound }) => {
    const errorImages = [ErrorImg1, ErrorImg2, ErrorImg3, ErrorImg4];
    const randomIndex = Math.floor(Math.random() * errorImages.length);
    const randomImage = errorImages[randomIndex];
    useEffect(() => {
        const originalTitle = document.title;
        document.title = "404 Not Found";
        setIsNotFound(true);
        return () => {
            document.title = originalTitle;
            setIsNotFound(false);
        }
    })

    return (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center overflow-hidden">
            <img src={randomImage} alt="404 Not Found" className="h-90 w-95" />
            <p className="text-center text-2xl font-bold text-red-800">404</p>
            <p className="text-center text-2xl font-bold">Sorry, there's nothing here.</p>
            <p className="text-center text-2xl">
                Go to the <Link to={"/"} className="underline text-blue-800">home page</Link>
            </p>
        </div>
    );
}

export default NotFound;    