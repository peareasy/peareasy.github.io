import React, {useEffect, useState} from "react";
import { useCookies } from "react-cookie";
import * as api from "../api/api";

const Home = () => {
  //TODO: find way to get extension id
  const extensionId = "jjkdpohdgeeohccdmbhmecimolaglhkd";
  const [cookies, setCookie] = useCookies(["peareasy"]);
  const [players, setPlayers] = useState([])

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

  const onGetPlayers = () => {
    api.getPlayers(cookies['peareasy']).then((players) => {
      setPlayers(players)
    })
  }

  let playersJsx: JSX.Element[] = []
  if (players) {
    players.map(player => playersJsx.push(<p style={{width: "100%"}}>{player}</p>))
  }

  return <ul>
    {<p style={{width: "100%"}}>{cookies['peareasy']}</p> }
    <button onClick={onGetPlayers}>
      Get players
    </button>
      {playersJsx}
  </ul>;
};

export default Home;
