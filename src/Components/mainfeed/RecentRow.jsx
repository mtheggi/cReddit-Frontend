import redditLogo from '../../assets/reddit_logo.png';
import Separator from '../sidebar/Nav-Icons/Separator';


const RecentRow = () => {
    return (  
        <div className='mt-2.5 flex flex-col items-center'>
                <div className='flex flex-row px-3 h-full'>

                    <div className='flex flex-col h-full min-w-10/12'>

                        <div className=' w-full h-8 flex no-select flex-row items-center'>
                            <img src={redditLogo} alt="Logo" className="w-6 h-6" />
                            <p className='text-gray-400 font-normal text-xs ml-1.5 hover:underline cursor-pointer'>r/DunderMifflin</p>
                        </div>

                        <div className=' w-full max-h-18 text-gray-400 text-sm py-2 font-semibold'>
                            <h1 className='hover:underline cursor-pointer'>I know Jan didn't poison the the food. I know that. But if..</h1>
                        </div>

                    </div>

                    {/* Todo: (already done, DONT DELETE) when the img div doesnt exist, then this div will dissapear, and text take all place */}
                    {/* <div className='  flex w-6/12 h-full'>  </div>  */}
                </div>

                <div className='  w-full flex h-6  mb-2.5 px-3 items-center text-gray-500 no-select'>
                    <p className='text-xs mr-2'>3 upvotes</p>
                    <p className='mb-2'>.</p>
                    <p className='text-xs ml-2'>10 Comments</p>
                </div>
              
            </div>
            
    );
}
 
export default RecentRow;