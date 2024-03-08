const Home = () => {

    const [isVisibleLeftSidebar, setIsVisibleLeftSidebar] = useState(false);

    const sidebarRef = useRef();
    const navbarRef = useRef();
    const recentRef = useRef();
    const mainfeedRef = useRef();

    useEffect(() => {
        let handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)
                && navbarRef.current && !navbarRef.current.contains(e.target)) {
                setIsVisibleLeftSidebar(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1200px)');

        const handleResize = () => {
            if (mediaQuery.matches) {
                setIsVisibleLeftSidebar(false);
            }
        };

        mediaQuery.addEventListener('change', handleResize);
        handleResize();

        return () => mediaQuery.removeEventListener('change', handleResize);
    });

    useEffect(() => {
        let timer = null;

        const handleScroll = () => {
            clearTimeout(timer);

            if (!recentRef.current.classList.contains('scrolling')) {
                recentRef.current.classList.add('scrolling');
            }

            if (!sidebarRef.current.classList.contains('scrolling')) {
                sidebarRef.current.classList.add('scrolling');
            }

            if (!mainfeedRef.current.classList.contains('scrolling')) {
                mainfeedRef.current.classList.add('scrolling');
            }

            timer = setTimeout(function () {
                if (recentRef.current.classList.contains('scrolling')) {
                    recentRef.current.classList.remove('scrolling');
                }
                if (sidebarRef.current.classList.contains('scrolling')) {
                    sidebarRef.current.classList.remove('scrolling');
                }
                if (mainfeedRef.current.classList.contains('scrolling')) {
                    mainfeedRef.current.classList.remove('scrolling');
                }
            }, 440);
        };

        recentRef.current.addEventListener('scroll', handleScroll);
        sidebarRef.current.addEventListener('scroll', handleScroll);
        mainfeedRef.current.addEventListener('scroll', handleScroll);

        return () => {
            recentRef.current.removeEventListener('scroll', handleScroll);
            sidebarRef.current.removeEventListener('scroll', handleScroll);
            mainfeedRef.current.removeEventListener('scroll', handleScroll);
        };
    });
    return (
        <div className="w-full h-full">
            <div className={`fixed inset-0 bg-black opacity-50 z-10 ${isVisibleLeftSidebar ? 'block' : 'hidden'}`} onClick={() => setIsVisibleLeftSidebar(false)}> </div>
            <Navbar isVisibleLeftSidebar={isVisibleLeftSidebar} setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} navbarRef={navbarRef} />
            <div className="w-full mt-14 inline-flex flex-row justify-center overflow-hidden">

                <div className={`relative flex flex-row w-fit lg:mr-5 xl:mr-3% mxl:mr-10 h-full`}>

                    <div ref={sidebarRef} className={`h-full ${isVisibleLeftSidebar ? 'absolute xl:relative xl:flex  bg-reddit_navbar w-70' : 'hidden xl:flex'} z-10 w-60 border-r border-neutral-800 pt-2 mr-2 no-select ml-auto overflow-auto scrollbar_mod overflow-x-hidden`}>
                        <Sidebar />
                    </div>

                    <div className='mxl:w-192 mt-2 flex flex-row overflow-auto overflow-x-hidden scrollbar_mod flex-grow lg:flex-grow-0 xl:ml-0 w-65% xl:w-51% mx-1 lg:mx-2 ' ref={mainfeedRef}>
                        <Mainfeed />
                    </div>

                    <div className='w-fit h-full overflow-auto overflow-x-hidden scrollbar_mod' ref={recentRef}>
                        <Recent />
                    </div>

                </div>

            </div >
        </div>




    );
}

export default Home;