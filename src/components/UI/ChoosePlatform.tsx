import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../redux/user/userSlice";

type Props = {
    onSelected: (chosenPlatform: string) => void;
}

const ChoosePlatform = ({onSelected}: Props) => {

    const platforms_data = [
        'ps',
        'xbox',
        'pc'
    ]
    const user = useSelector(getUserSelector);
    let idx 
    if (user.data?.platform) {
        platforms_data.indexOf(user.data?.platform);
    } else {
        idx = 0
    }
    const [selectedPlatform, setSelectedPlatform] = useState(idx);


    const onPlatformSelected = (idx: number) => {
        setSelectedPlatform(idx);
        onSelected(platforms_data[idx]);
    }
    
    const platforms = platforms_data.map((platform, idx) => {
        let className = ["bg-gray-800 border border-gray-800 p-4 rounded hover:bg-gray-700"]
        if (selectedPlatform === idx) {
            className.push("border-primary-500")
        }
        return ( 
        <button className={className.join(' ')} onClick={() => onPlatformSelected(idx)} key={idx}>
            <img src={process.env.PUBLIC_URL + platform+'.png'} className='w-8 h-8' alt={platform}/>
        </button>
        )}
    )

    return <div className="flex flex-row gap-x-8">
        {platforms}
    </div>
}

export default ChoosePlatform