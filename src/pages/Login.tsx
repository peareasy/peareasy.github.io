import GoogleLogin from "react-google-login";
import {login, signUp} from "../api/publicApi";
import {useNavigate} from "react-router";
import {useState} from "react";

type LoginProps = {
  setLogin: (isLoggedIn: boolean) => void;
}

const Login = ({setLogin}:LoginProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState('')

  const responseGoogleLogin = (response: any) => {
    console.log('login called')
    setError('')
    login(response).then(res => {
      setLogin(true);
      navigate('/')
    }).catch(err => {
      console.log('login error: ', err);
      setError('Couldn\'t find user. Are you sure that you have signed up?')
    })
  }

  const responseGoogleSignUp = (response: any) => {
    console.log('sign up called')
    setError('')
    signUp(response).then(res => {
      setLogin(true);
      navigate('/')
    }).catch(err => {
      console.log('login error: ', err);
      if (err.response.status === 409) {
        setError('User already exists. Try to login instead')
      } else {
        setError('Something went wrong. Try again later')
      }
    })
  }

  return <div className='mx-auto flex font-light flex-col gap-y-4 p-8 bg-gray-900 rounded'>
    <div>
      <h1 className='text-xl text-secondary'>Log in to easySBC ⚽</h1>
      <h2 className='text-m italic font-thin text-gray-200'>easysbc.io</h2>
    </div>
    <h3 className='text-xs font-light text-gray-300'>
      In order to utilize all the functionality provided, please log in below.
    </h3>
    <div className='mx-auto flex flex-col gap-y-4'>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
        buttonText="Login with Google"
        onSuccess={responseGoogleLogin}
        onFailure={responseGoogleLogin}
        cookiePolicy={'single_host_origin'}
    />
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
        buttonText="Sign Up with Google"
        onSuccess={responseGoogleSignUp}
        onFailure={responseGoogleSignUp}
        cookiePolicy={'single_host_origin'}
      />
    </div>
    {<div className='text-sm text-error-500 mx-auto'>{error}</div>}
  </div>
};

export default Login;