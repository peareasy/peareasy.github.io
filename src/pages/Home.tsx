import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import * as api from "../api/api";

const Home = () => {
  const id = "pcjpfpboackpjobnpeknldjaencjmjlp";

  console.log("Sending msg");

  chrome.runtime.sendMessage(
    id,
    {
      messageFromWeb: window.localStorage,
    },
    function (res) {
      console.log(res);
      console.log("Got response");
    }
  );

  const [cookies, setCookie] = useCookies(["peareasy"]);
  useEffect(() => {
    if (!cookies["peareasy"]) {
      api.postUUID().then((uuid: string) => {
        setCookie("peareasy", uuid);
      });
    }
  }, [cookies, setCookie]);
  return <></>;
};

export default Home;
