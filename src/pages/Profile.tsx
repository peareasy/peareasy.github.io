import {PrimaryButton} from "../components/UI/Button";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import {getUserSelector, logoutUser} from '../redux/user/userSlice';
import { APIStatus } from '../enums/APIStatus';
import Spinner from "../components/UI/Spinner/Spinner";
import {AppDispatch} from "../redux/store";

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
  return <div className='container mx-auto w-1/3 flex font-light flex-col gap-y-4 p-8 bg-gray-900 rounded text-secondary'>
    {user.status !== APIStatus.FULFILLED ? <Spinner/>: <>
    <div>
        <h1 className='text-l'>Hi, {user.data?.name}</h1>
      </div>
      <div className={'text-sm text-gray-300'}>
        This is your email: {user.data?.email}
      </div>
      <PrimaryButton onClick={() => logout()} title={'Logout'}/> </>}
    </div>
}
export default Profile