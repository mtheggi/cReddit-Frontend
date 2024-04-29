const NoResults = ({query}) => {
    return (



        <div className="w-full flex-row flex bg-[#04090A] h-fit py-4 rounded-lg items-center px-3 ml-1 mt-3">
            <img src="https://www.redditstatic.com/shreddit/assets/telescope-snoo.svg" className="w-[68px] mr-4 min-w-[68px] h-[64px]"></img>

            <div className="flex flex-col w-full">
                <h1 className="text-[17px] text-[#B7C5C8] font-medium mt-2">Hm... we couldn't find any results for</h1>
                <h1 className="text-[17px] text-[#B7C5C8] font-medium mt-[2px]">"{query}"</h1>
                <h1 className="text-[14px] text-[#83959B] font-light mt-2">Double check your spelling or try different keywords</h1>
            </div>

        </div>
    );
}

export default NoResults;