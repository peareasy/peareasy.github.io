import {useSelector} from "react-redux";
import {getUserSelector} from "../../redux/user/userSlice";

type CardSBCProps = {
  title: string;
  onClick: (clickedRestrictedSBC: boolean) => void;
  selected: boolean;
  changeImg: string;
  restricted: boolean;
};

const CardSBC = ({title, onClick, selected, changeImg, restricted}: CardSBCProps) => {
  const cardClassName = ['rounded-xl hover:bg-gray-800 flex flex-col m-auto cursor-pointer border-2 w-full']

  const user = useSelector(getUserSelector);
  const denied = !user.data && restricted

  const onCardClicked = (denied: boolean) => {
    onClick(denied)
  }

  if (selected) {
    cardClassName.push('border-primary-500 bg-gray-800')
  } else {
    cardClassName.push('bg-gray-900 border-gray-900')
  }
  if (denied) {
    cardClassName.push('bg-gray-400 border-gray-400 hover:bg-gray-500')
  }

  return (
    <div key={title} className={cardClassName.join(' ')} onClick={() => onCardClicked(denied)}>
      <p className='pt-4 text-l mx-2'>
        {title}
      </p>
      <div className='mx-auto w-44'>
        <img alt={title} src={process.env.PUBLIC_URL + changeImg}/>
      </div>
    </div>
  )
}

export default CardSBC;
