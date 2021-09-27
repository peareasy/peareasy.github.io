import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import * as api from "../api/api";

const Home = () => {

  const sendUUIDToExtension = () => {
    const id = "pcjpfpboackpjobnpeknldjaencjmjlp";

    chrome.runtime.sendMessage(
      id,
      {
        messageFromWeb: window.localStorage,
      },
      function (res) {
        console.log(res);
      }
    );
  }

  const [cookies, setCookie] = useCookies(["peareasy"]);
  useEffect(() => {
    if (!cookies["peareasy"]) {
      api.postUUID().then((uuid: string) => {
        setCookie("peareasy", uuid);
      });
    }
  }, [cookies, setCookie]);

  if (cookies['peareasy']) {
    sendUUIDToExtension()
  }
  return <>
    {cookies['peareasy']}
  </>;
};

export default Home;
