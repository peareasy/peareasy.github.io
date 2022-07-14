const ImportErrorView = () => 
    <div role="alert">
        <div className='w-2/3 m-auto mt-10'>
        <div className="bg-error-500 text-white font-bold rounded-t px-3 py-1">
            Oh no
        </div>
        <div className="border border-t-0 border-error-400 rounded-b bg-red-100 px-4 py-3 text-red-700 ">
            <p>It seems like your players weren't imported properly. Please try again or see
            <a rel="noreferrer"
                href="https://www.youtube.com/watch?v=sFu6rMaSEDg"
                target="_blank"> this </a>
            tutorial</p>
        </div>
        </div>
    </div>


export default ImportErrorView