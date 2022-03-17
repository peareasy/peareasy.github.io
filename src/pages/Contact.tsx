import { ChangeEvent, useState } from "react";
import { PrimaryButton } from "../components/UI/Button";
import * as api from "../api/api";

const Contact = () => {     
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState("")

    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const onSendMessage = () => {
        api.sendMessage({email, message})
    }

  return (
    <div className={'text-center space-y-8 max-w-xs w-full mx-auto'}>

    <h1 className="text-3xl font-bold  mt-10 text-secondary">Contact us</h1>

        <div className=' space-y-4'>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-secondary" htmlFor="email">
                Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" value={email} onChange={onEmailChange} placeholder="Email"/>
        </div>

    <div className="">
    <label className="block text-gray-700 text-sm font-bold mb-2 text-secondary" htmlFor="email">
        Message
      </label>
        <textarea maxLength={500} id="subject" name="subject" placeholder="Type your message here" className="form-input px-3 py-2 rounded-md text-black w-full" required value={message} onChange={onMessageChange}/>
    </div>
        <div className="left-0 right-0">
        <PrimaryButton onClick={onSendMessage} title={"Send message"}/>
        </div>
   
    </div>

</div>
    
  )
}

export default Contact