import {login} from "../api/publicApi";
import {useNavigate} from "react-router";
import {useEffect, useRef, useState} from "react";

type LoginProps = {
  setLogin: (isLoggedIn: boolean) => void;
}

const Login = ({setLogin}:LoginProps) => {
  const [error, setError] = useState('')
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scriptLoaded) return undefined;

    const handleBackendSignIn = (credential: string) => {
      login(credential).then(_ => {
        setLogin(true);
        navigate('/')
      }).catch(err => {
        console.log('login error: ', err);
        setError('Couldn\'t find user. Are you sure that you have signed up?')
      })
    }

    const handleGoogleSignIn = (res: CredentialResponse) => {
      if (!res.clientId || !res.credential) {
        setError('Couldn\'t login to your Google account');
      } else {
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

    console.log('execute')
    return () => {
      window.google?.accounts.id.cancel();
      document.getElementById("google-client-script")?.remove();
    };
  }, [navigate, scriptLoaded, setLogin]);

  return <div className='mx-auto flex font-light flex-col gap-y-4 p-8 bg-gray-900 rounded'>
    <div>
      <h1 className='text-xl text-secondary'>Log in to easySBC ⚽</h1>
      <h2 className='text-m italic font-thin text-gray-200'>easysbc.io</h2>
    </div>
    <h3 className='text-xs font-light text-gray-300'>
      In order to utilize all the functionality provided, please log in below.
    </h3>
    <div className='mx-auto flex flex-col pt-4'>
      <div ref={divRef} className={'w-[200px]'}/>
  </div>
  {<div className='text-sm text-error-500 mx-auto'>{error}</div>}
</div>
};

export default Login;