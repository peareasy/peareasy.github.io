import {PrimaryButton} from "../components/UI/Button";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import {getUserSelector, logoutUser} from '../redux/user/userSlice';
import Spinner from "../components/UI/Spinner/Spinner";
import {AppDispatch} from "../redux/store";
import {NavLink} from "react-router-dom";

type LogoutProps = {
  setLogin: (isLoggedIn: boolean) => void;
}

const Profile = ({setLogin}: LogoutProps) => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser()).then(_ => {
      setLogin(false)
      navigate('/')
    })
  }
  return <div className='container mx-auto w-1/3 md:w-full flex font-light flex-col gap-y-4 p-8 bg-gray-900 rounded'>
    {!user.data ? <Spinner/>: <>
    <div>
        <h1 className='text-xl text-secondary'>Hi, {user.data?.name} 👋</h1>
      </div>
      <div className={'text-m text-gray-200 font-bold'}>
        📧 Email
      </div>
      <div className={'text-m text-gray-300'}>
        {user.data?.email}
      </div>
      <div className={'text-m text-gray-200 font-bold'}>
        💰 Current subscription
      </div>
      <div className={'text-m text-gray-300'}>
        Free tier. You can upgrade {<NavLink to={'/subscription'}>here!</NavLink>}
      </div>
      <br/>
      <div className={'text-m text-gray-300'}>
        In order to <span className={'text-error-600 font-bold'}>delete</span> your account, please {<NavLink to={'/contact'}>contact us</NavLink>} and we will
        do it as soon as possible
      </div>
      <div className={'m-auto'}>
        <PrimaryButton onClick={() => logout()} title={'Logout'}/>
      </div>
    </>}
    </div>
}
export default Profile