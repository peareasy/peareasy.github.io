import {login} from "../api/publicApi";
import {useLocation, useNavigate} from "react-router";
import {useEffect, useRef, useState} from "react";
import {fetchUser} from "../redux/user/userSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import ReactGA from "react-ga4";

type LoginProps = {
  setLogin: (isLoggedIn: boolean) => void;
}

const Login = ({setLogin}:LoginProps) => {
  const [error, setError] = useState('')
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  // @ts-ignore
  const from = location.state?.pathname || '/'
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scriptLoaded) return undefined;

    const handleBackendSignIn = (credential: string) => {
      // TODO: update such that login itself is using redux as well
      login(credential).then(_ => {
        dispatch(fetchUser())
        setLogin(true);
        navigate(from, { state: location.state })
      }).catch(err => {
        console.log('login error: ', err);
        setError('Couldn\'t find user. Are you sure that you have signed up?')
      })
    }

    const handleGoogleSignIn = (res: CredentialResponse) => {
      if (!res.clientId || !res.credential) {
        ReactGA.event({
          category: "Login",
          action: "google_login_error",
        })
        setError('Couldn\'t login to your Google account');
      } else {
        ReactGA.event({
          category: "Login",
          action: "google_login_success",
        });
        handleBackendSignIn(res.credential)
      }
    }

    const initializeGoogle = () => {
      if (!window.google || scriptLoaded) return;

      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
        callback: handleGoogleSignIn,
      });
      renderButton()
    };
    const renderButton = () => {
      if (!window.google) return;

      window.google.accounts.id.renderButton(divRef.current!, {
        theme: 'outline',
        type: 'standard',
        width: '200px',
      })
      setScriptLoaded(true);
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = initializeGoogle;
    script.async = true;
    script.id = "google-client-script";
    document.querySelector("body")?.appendChild(script);

    return () => {
      window.google?.accounts.id.cancel();
      document.getElementById("google-client-script")?.remove();
    };
  }, [dispatch, from, navigate, scriptLoaded, setLogin, location.state]);


  return <div className='mx-auto flex font-light flex-col gap-y-4 p-8 bg-gray-900 rounded'>
    <div>
      <h1 className='text-xl text-secondary'>Log in to easySBC ⚽</h1>
      <h2 className='text-m italic font-thin text-gray-200'>easysbc.io</h2>
    </div>
    <p className='text-xs font-light text-gray-300'>
      Login to access all functionality
    </p>
    <div className='mx-auto flex flex-col pt-4 pb-4'>
      <div ref={divRef} className={'w-[200px]'}/>
  </div>
    <p className='text-xs font-light text-gray-300'>
      By logging in you accept our <a href={'#/tos'}>Terms of Service</a> and <a href={'#/privacy'}>Privacy Policy</a>
    </p>
  {<div className='text-sm text-error-500 mx-auto'>{error}</div>}
</div>
};

export default Login;