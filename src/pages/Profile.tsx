import * as privateApi from "../api/privateApi";
import {PrimaryButton} from "../components/UI/Button";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import Spinner from "../components/UI/Spinner/Spinner";

type LogoutProps = {
  setLogin: (isLoggedIn: boolean) => void;
}

const Profile = ({setLogin}: LogoutProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showSpinner, setShowSpinner] = useState(true)

  useEffect(() => {
    setShowSpinner(true)
    privateApi.getProfile().then(res => {
      setName(res.given_name)
      setEmail(res.email)
        setShowSpinner(false)
    }).catch(_ => {
        setLogin(false)
        window.location.href = "#/login";
        setShowSpinner(false)
      }
    )
  },[setLogin])

  const logout = () => {
    privateApi.logout().then(_ => {
      setLogin(false)
      navigate('/')
    })
  }

  return <div className='container mx-auto w-1/3 flex font-light flex-col gap-y-4 p-8 bg-gray-900 rounded text-secondary'>
    {showSpinner ? <Spinner/>: <>
    <div>
        <h1 className='text-l'>Hi, {name}</h1>
      </div>
      <div className={'text-sm text-gray-300'}>
        This is your email: {email}
      </div>
      <PrimaryButton onClick={() => logout()} title={'Logout'}/> </>}
    </div>
}
export default Profile