import React, {useEffect, useState} from "react";
import { useCookies } from "react-cookie";
import * as api from "../api/api";

const Home = () => {
  //TODO: find way to get extension id
  const extensionId = "jjkdpohdgeeohccdmbhmecimolaglhkd";
  const [cookies, setCookie] = useCookies(["peareasy"]);
  const [players, setPlayers] = useState([])
  const [sbcs, setSBCs] = useState([])

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

  const onGetSBCs = () => {
    api.getSBCs().then((sbcs) => {
      setSBCs(sbcs)
    })
  }

  let playersJsx: JSX.Element[] = []
  if (players) {
    players.map(player => playersJsx.push(<p style={{width: "100%"}}>{player}</p>))
  }

  // For testing purposes
  let sbcsJsx: JSX.Element[] = []
  if (sbcs) {
    // @ts-ignore
    sbcs.map(sbc => sbcsJsx.push(<button style={{width: "100%", marginTop: "10px"}}>{sbc.name}</button>))
  }


  return <ul style={{width: "50%", margin: "auto"}}>
    {<p style={{width: "100%"}}>{cookies['peareasy']}</p> }
    <button onClick={onGetPlayers}>
      Get players
    </button>
    <button onClick={onGetSBCs}>
      Get SBCs
    </button>
    <div style={{height: "600px", overflow: "scroll", backgroundColor: "whitesmoke", marginTop: "10px"}}>
      {playersJsx}
    </div>
      {sbcsJsx}
  </ul>;
};

export default Home;
