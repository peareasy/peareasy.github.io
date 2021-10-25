import React, {useState} from "react";
import { SecondaryButton } from "../components/UI/Button";
import * as api from "../api/api";
import {useCookies} from "react-cookie";

const Profile = () => {
  const [isSignInMode, setIsSignInMode] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cookies, setCookie] = useCookies(["peareasy"]);

  if (cookies["peareasy"]) {
    return <h1 className="text-secondary text-center text-3xl mt-8 mb-8">You are logged in!</h1>
  }

  const submitButton = isSignInMode ? (
    <SecondaryButton onClick={() => {
      api.signIn(email, password).then(uuid => setCookie("peareasy", uuid))
    }} title={"Sign In"}/>) :
    (<SecondaryButton onClick={() => {
    api.signUp(email, password).then(uuid => setCookie("peareasy", uuid))
  }} title={"Sign Up"}/>)

  return (
    <div className="container mx-auto w-1/3">
      <div className="bg-primary-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-secondary text-sm font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="text" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
        </div>
        <div className="mb-6">
          <label className="block text-secondary text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="******************" onChange={event => setPassword(event.target.value)}/>
            <p className="text-secondary text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex flex-col gap-y-6">
          {submitButton}
          <button className="inline-block align-baseline font-bold text-sm text-secondary hover:text-tertiary-300"
          onClick={() => setIsSignInMode(!isSignInMode)}>
            { isSignInMode ? "Change to sign Up" : "Change to sign In"}
          </button>
        </div>
      </div>
      <p className="text-center text-secondary text-xs">
        &copy;2021 Peareasy Corp. All rights reserved.
      </p>
    </div>
  )
}

export default Profile