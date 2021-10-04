import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import * as api from "../api/api";

const Home = () => {
  //TODO: find way to get extension id
  const extensionId = "jjkdpohdgeeohccdmbhmecimolaglhkd";

  const [cookies, setCookie] = useCookies(["peareasy"]);
  useEffect(() => {
    if (!cookies["peareasy"]) {
      api.postUUID().then((uuid: string) => {
        setCookie("peareasy", uuid);
      });
    }
  }, [cookies, setCookie]);

  useEffect(() => {
    const sendUUIDToExtension = () => {
      chrome.runtime.sendMessage(
        extensionId,
        {
          uuid: cookies["peareasy"]
        }
      );
    }
    if (cookies['peareasy']) {
      sendUUIDToExtension()
    }
  }, [cookies])

  return <div style={{
    textAlign: "center"
  }}>
    {cookies['peareasy']}
  </div>;
};

export default Home;
