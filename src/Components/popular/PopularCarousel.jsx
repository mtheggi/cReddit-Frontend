import React, { useEffect, useState, useRef } from 'react';
import { getRequest } from '../../services/Requests';
import { baseUrl } from '../../constants';
import { useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

const PopularCarousel = () => {
    const [popularPosts, setPopularPosts] = useState([]);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const carouselRef = useRef(null);
    const [atMostRight, setAtMostRight] = useState(false);
    const [atMostLeft, setAtMostLeft] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkScrollPosition = () => {
            if (carouselRef.current) {
                setAtMostLeft(carouselRef.current.scrollLeft >= 0 && carouselRef.current.scrollLeft <= 290);
                setAtMostRight(carouselRef.current.scrollLeft === carouselRef.current.scrollWidth - carouselRef.current.clientWidth);
            }
        }

        checkScrollPosition();

        if(carouselRef.current)
        carouselRef.current.addEventListener('scroll', checkScrollPosition);

        return () => {
            if(carouselRef.current)
            carouselRef.current.removeEventListener('scroll', checkScrollPosition);
        }
    }, [popularPosts]);


    useEffect(() => {
        const fetchPopularPosts = async () => {

            try{
            setIsLoading(true);
            const response = await getRequest(`${baseUrl}/post/popular`);
            if (response.status === 200 || response.status === 201)
                setPopularPosts(response.data);
            }catch(e){
                console.log(e);
            }
            finally {
                setIsLoading(false);
            }

         
        }

        if (location.pathname === '/popular')
            fetchPopularPosts();
    }, []);


    const scrollLeft = () => {
        carouselRef.current.scrollBy({
            top: 0,
            left: -290,
            behavior: 'smooth'
        });
    }

    const scrollRight = () => {
        carouselRef.current.scrollBy({
            top: 0,
            left: 290,
            behavior: 'smooth'
        });
    }




    return (
        <div className='block h-[210px] relative'>
            { isLoading? <Loading/>:
                <>
                <ul ref={carouselRef} class="snap-x snap-mandatory list-none overflow-x-scroll  scroll-smooth flex flex-row no-scrollbar  ...">


                {popularPosts.map((post, index) => (
                    <div onClick={
                        ()=>navigate(post.communityName ? `/r/${post.communityName}/comments/${post._id}` : `/u/${post.username}/comments/${post._id}`)
                    }  key={index} class="mr-4 flex-col cursor-pointer h-[210px] relative w-[290px] inline-flex shrink-0 snap-mandatory snap-start list-none overflow-hidden rounded-[16px]">
                        <img className='absolute object-cover w-full h-full' src={post.content} />
                        <div className='absolute w-full h-full bg-black opacity-50'></div>
                        <div className='w-full h-full z-10 px-3 justify-end flex flex-col'>
                            <h1 className='text-[20px] text-gray-200 shadow-md font-semibold truncate'> {post.title}</h1>
                            <div onClick={
                                (e)=>{e.stopPropagation(); navigate(post.communityName ? `/r/${post.communityName}` : `/user/${post.username}`)}
                            } className='flex cursor-pointer mt-[10px] mb-[14px] items-center flex-row'>
                                <img className='rounded-full peer w-[25px] h-[25px]' src={post.profilePicture} alt="" />
                                <h1 className='text-gray-200 peer-hover:underline hover:underline text-[12px] font-medium ml-[7px]'>{post.communityName ? `r/${post.communityName}` : `u/${post.username}`}</h1>
                            </div>
                        </div>
                    </div>))}
            </ul>
            {!atMostLeft && <span onClick={scrollLeft} class="absolute left-[8px] top-[85px] md:inline visible opacity-60 hover:opacity-100 z-20">
                <button class="inline-flex size-8 items-center justify-center rounded-full bg-black  cursor-pointer px-1.5 text-white ">
                    <span class="flex items-center justify-center">
                        <span class="flex">
                            <svg fill="white" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.793 19.707-9-9a1 1 0 0 1 0-1.414l9-9 1.414 1.414L5.914 10l8.293 8.293-1.414 1.414Z"></path>
                            </svg>
                        </span>
                    </span>
                </button>
            </span>}

            {!atMostRight && <span onClick={scrollRight} class="absolute z-20 right-[8px] top-[85px] md:inline visible opacity-60 hover:opacity-100">
                <button class="inline-flex size-8 items-center justify-center cursor-pointer rounded-full bg-black px-1.5 text-white ">
                    <span class="flex items-center justify-center">
                        <span class="flex">
                            <svg fill="white" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="m7.207 19.707-1.414-1.414L14.086 10 5.793 1.707 7.207.293l9 9a1 1 0 0 1 0 1.414l-9 9Z">
                                </path>
                            </svg>
                        </span>
                    </span>
                </button>
            </span>}
            </>}
        </div>
    );
}

export default PopularCarousel;