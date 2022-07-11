import { useState, useEffect } from "react"
import InstallExtensionView from './views/InstallExtensionView'
import UseChromeView from './views/UseChromeView'
import ImportPlayersView from './views/ImportPlayersView'
import { useSelector } from "react-redux";
import { getUserSelector } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchUser } from "../../redux/user/userSlice";

const ImportPlayers = () => {
  const [extensionInstalled, setExtensionInstalled] = useState(false)
  const user = useSelector(getUserSelector)
  const dispatch = useDispatch<AppDispatch>();
  // ---
  // helper functions
  const isChrome = () => window.chrome

  const checkExtensionInstalled = () => window.chrome.runtime.sendMessage(
      process.env.REACT_APP_EXTENSION_ID!, { uuid: user.data.uuid }, 
      (res) => setExtensionInstalled(res.msg === 'confirmation')
    );
  // ---
  useEffect(() => {
    // TODO: If user is not logged in, make them login (otherwise it will show the InstallExtension)
    if (user?.data?.email && window.chrome?.runtime) {
      checkExtensionInstalled()
    } else {
      dispatch(fetchUser)
    }
  }, [dispatch, fetchUser, user, checkExtensionInstalled])

  let view 
  if (!isChrome()) {
    view = <UseChromeView/>
  } else if(!extensionInstalled) {
    view = <InstallExtensionView/>
  } else {
    view = <ImportPlayersView/>
  }

  return <main className='text-secondary text-center m-auto relative z-10'>
    {view}
  </main>
}

export default ImportPlayers;