// import {NavLink} from "react-router-dom";
// import {PrimaryButton} from "../../components/UI/Button";
// import * as api from "../../api/publicApi";
// import React, {useState} from "react";
// import {useCookies} from "react-cookie";

const TOS = () => {

}
// type Props = {
//   onClick: (uuid: string) => any
// }
// const TOS = ({ onClick }:Props) => {
//   const [tosAccepted, setTosAccepted] = useState(false)
//   const [, setCookie] = useCookies(["userId"]);
//
//   const onTosAcceptChange = () => {
//     setTosAccepted(!tosAccepted)
//   }
//
//   return (
//     <div className="space-y-12 text-center">
//       <img alt={"img"} className="m-auto w-1/3 " src={process.env.PUBLIC_URL+'/sbc_gold.png'}/>
//       <div className="form-check flex justify-center">
//         <input
//           className="form-check-input h-4 w-4 border rounded-sm focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
//           type="checkbox"
//           checked={tosAccepted}
//           onChange={onTosAcceptChange}
//         />
//         <label>
//           <p>I hereby declare that I have read and accept both</p>
//           <p><NavLink to={"/tos"} target="_blank">Terms of Service</NavLink> and <NavLink to={"/privacy"} target="_blank">Privacy Policy</NavLink></p>
//         </label>
//       </div>
//       <PrimaryButton disabled={!tosAccepted} onClick={() => {
//         api.loginAsAnonymous().then((uuid: string) => {
//           setCookie("userId", uuid);
//           onClick(uuid)
//         });
//       }} title={"Start Solving SBCs"}/>
//     </div>
//   )
// }
//
export default TOS