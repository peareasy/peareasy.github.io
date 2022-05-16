import GoogleLogin from "react-google-login";
import {signInWithGoogle} from "../api/api";

const SignInWithGoogle = () => {

  const responseGoogle = (response: any) => {
    signInWithGoogle(response)
  }

  return <GoogleLogin
    clientId="658426022555-ppcm1tvmpj7qckmj4i94nnsu8prk3i7q.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
};

export default SignInWithGoogle;