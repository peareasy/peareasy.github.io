import { PrimaryButton } from "../components/UI/Button";
import { useNavigate } from "react-router";
import * as privateApi from "../api/privateApi";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector, logoutUser } from "../redux/user/userSlice";
import { AppDispatch } from "../redux/store";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ChoosePlatform from "../components/UI/ChoosePlatform";
import { fetchUser } from "../redux/user/userSlice";
import { Subscription } from "../enums/Subscription.enum";
import Modal from "../components/UI/Modal";
import Spinner from "../components/UI/Spinner/Spinner";

type LogoutProps = {
  setLogin: (isLoggedIn: boolean) => void;
};

const Profile = ({ setLogin }: LogoutProps) => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showVerifyUnsub, updateShowVerifyUnsub] = useState(false);
  const [showUnsubConfirmation, updateShowUnsubConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const userSubCancelsAtDate = user.data?.cancelsAt
    ? new Date(user.data?.cancelsAt * 1000).toDateString()
    : undefined;
  const userSubCancelsAtMsg = userSubCancelsAtDate
    ? `(expires ${userSubCancelsAtDate})`
    : undefined;

  // d.setUTCSeconds(123);
  console.log(userSubCancelsAtMsg);

  const onPlatformChosen = (platform: string) => {
    privateApi.patchUser({ platform });
    dispatch(fetchUser());
  };

  const logout = () => {
    dispatch(logoutUser()).then((_) => {
      setLogin(false);
      navigate("/");
    });
  };

  const unsubscribe = async () => {
    setLoading(true);
    updateShowVerifyUnsub(false);
    await privateApi.unsubscribe();
    await dispatch(fetchUser());
    setLoading(false);
    updateShowUnsubConfirmation(true);
  };

  const reactivateSub = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 5000);
  };

  const verifyUnsubscribeModal = (
    <Modal
      negativeActionButtonLabel="Cancel"
      positiveActionButtonLabel="Yes, unsubscribe"
      onCloseClicked={() => updateShowVerifyUnsub(false)}
      onNegativeActionClicked={() => updateShowVerifyUnsub(false)}
      onPositiveActionClicked={() => unsubscribe()}
      body={<>{"Are you sure you want to unsubscribe?"}</>}
      header={"We hate to see you go!"}
    />
  );

  const unsubConfirmationModal = (
    <Modal
      negativeActionButtonLabel=""
      positiveActionButtonLabel="Ok"
      onCloseClicked={() => updateShowUnsubConfirmation(false)}
      onNegativeActionClicked={() => {}}
      onPositiveActionClicked={() => updateShowUnsubConfirmation(false)}
      body={
        <div className="flex flex-col gap-y-2">
          <p>Your subscription will now expire {userSubCancelsAtDate}</p>
        </div>
      }
      header={"We hope to see you again soon!"}
      notShowNegativeButton={true}
    />
  );

  useEffect(() => {
    if (!user.data) {
      navigate("/login");
    }
  }, [navigate, user.data]);

  let subscriptionSpan = (
    <span className="text-gray-300 mr-2">
      Free. You can upgrade {<NavLink to={"/subscription"}>here!</NavLink>}
    </span>
  );
  let subscriptionColor = "#22d3ee";

  if (user.data?.subscription === Subscription.SILVER) {
    subscriptionSpan = <span className="text-gray-300 mr-2">Pro</span>;
    subscriptionColor = "#C0C0C0";
  } else if (user.data?.subscription === Subscription.GOLD) {
    subscriptionSpan = <span className="text-gray-300 mr-2">Elite (Beta)</span>;
    subscriptionColor = "#FFD700";
  }

  return (
    <div className="container mx-auto w-1/3 md:w-full flex font-light flex-col gap-y-4 p-8 bg-gray-900 rounded">
      <div>
        <h1 className="text-xl text-secondary">Hi, {user.data?.name} 👋</h1>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className={"text-m text-gray-200 font-bold"}>Email</div>
        <div className={"text-m text-gray-300"}>{user.data?.email}</div>
      </div>

      <div className="flex flex-col gap-y-1">
        <div className={"text-m text-gray-200 font-bold"}>
          Current subscription
        </div>
        <div className={"text-sm text-gray-300 flex flex-row mb-1"}>
          <div
            className={"w-4 h-4 rounded-full my-auto mr-2"}
            style={{ backgroundColor: subscriptionColor }}
          />
          {subscriptionSpan}
          {userSubCancelsAtMsg || <></>}
        </div>
        {userSubCancelsAtDate ? (
          <div className="text-gray-300 italic text-sm">
            Click{" "}
            {
              <a href="#/profile" onClick={reactivateSub}>
                here
              </a>
            }{" "}
            to reactivate your subscription
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="text-m text-gray-200 font-bold">Choose your platform</div>
      <ChoosePlatform
        onSelected={(chosenPlatform) => onPlatformChosen(chosenPlatform)}
      />
      <div className={"text-sm text-gray-300"}>
        In order to delete your account, please{" "}
        {
          <a href="#/profile" onClick={unsubscribe}>
            contact us
          </a>
        }{" "}
        and we will do it as soon as possible
      </div>
      {user.data?.paid && !user.data?.cancelsAt ? (
        <div className={"text-sm text-gray-300"}>
          To unsubscribe click{" "}
          {
            <a href="#/profile" onClick={() => updateShowVerifyUnsub(true)}>
              here
            </a>
          }
        </div>
      ) : (
        <></>
      )}
      {loading ? (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none md:items-start">
          <Spinner />
        </div>
      ) : (
        <></>
      )}
      {showVerifyUnsub ? verifyUnsubscribeModal : <></>}
      {showUnsubConfirmation ? unsubConfirmationModal : <></>}
      <div className={"m-auto"}>
        <PrimaryButton onClick={() => logout()} title={"Logout"} />
      </div>
    </div>
  );
};
export default Profile;
