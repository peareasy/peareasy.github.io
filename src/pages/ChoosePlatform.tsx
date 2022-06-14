import { useState } from "react";
import { useSelector } from "react-redux";
import * as privateApi from "../api/privateApi";
import { getUserSelector } from "../redux/user/userSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import {fetchUser} from "../redux/user/userSlice";

const ChoosePlatform = () => {

    const platforms_data = [
        'ps',
        'xbox',
        'pc'
    ]
    const user = useSelector(getUserSelector);
    const dispatch = useDispatch<AppDispatch>();
    let idx 
    if (user.data?.platform) {
        platforms_data.indexOf(user.data?.platform);
    } else {
        idx = 0
    }
    const [selectedPlatform, setSelectedPlatform] = useState(idx);


    const onPlatformSelected = (idx: number) => {
        setSelectedPlatform(idx);
        privateApi.patchUser({ platform: platforms_data[idx] });
        dispatch(fetchUser())
    }
    
    const platforms = platforms_data.map((platform, idx) => {
        let className = ["bg-gray-800 border border-gray-800 p-4 rounded hover:bg-gray-700"]
        if (selectedPlatform === idx) {
            className.push("border-primary-500")
        }
        return ( 
        <button className={className.join(' ')} onClick={() => onPlatformSelected(idx)}>
            <img src={process.env.PUBLIC_URL + platform+'.png'} className='w-8 h-8' alt={platform}/>
        </button>
        )}
    )

    return <div className="flex flex-row gap-x-8">
        {platforms}
    </div>
}

export default ChoosePlatform