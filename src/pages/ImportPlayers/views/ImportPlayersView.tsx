import { useState } from "react"
import { SecondaryButton } from "../../../components/UI/Button"
import { open_link as openLinkIcon } from "../../../components/UI/icons"
import ImportErrorView from './ImportErrorView'
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux/user/userSlice";
import * as privateApi from "../../../api/privateApi"

const ImportPlayersView = () => {

    const user = useSelector(getUserSelector)
    const [importPlayersClicked, setImportPlayersClicked] = useState(false)

    const sendIdToExtension = () => window.chrome.runtime.sendMessage(
        process.env.REACT_APP_EXTENSION_ID!, { uuid: user.data.uuid}
    )

    // if yes, get players and see if some players were imported - if not, show error

    const onImportPlayersClicked = () => {
        // Remember to delete old players
        sendIdToExtension()
        setImportPlayersClicked(true)
        window.open('https://www.ea.com/fifa/ultimate-team/web-app/','_blank')
    }
    // getPlayers to see if they were imported correctly
    const onGetPlayers = () => {
        privateApi.getPlayers(user?.data?.uuid)
    }
    
    return <div className="flex flex-col">
    <p className="m-auto text-3xl pb-2">Import your players</p>
    <p className="m-auto text-gray-300 italic text-l pb-8">How to import your players from the FUT Web App in 5 easy steps</p>
    <div className="flex flex-row space-between justify-center space-x-2 pl-32 pr-32 w-screen">
        <div className="bg-zinc-800 flex flex-col mt-2 mb-24 w-52 rounded-sm laptop:h-72 h-72 shadow-md shadow-zinc-900">
        <div className="ml-4 mr-4 mt-8 h-16">
            <SecondaryButton title={"Open FUT App"} icon={openLinkIcon} onClick={onImportPlayersClicked}/>
        </div>
        <div className="bg-primary-700 rounded-full w-12 h-12 m-auto mb-4 flex shadow shadow-gray-900">
            <p className="text-secondary m-auto text-2xl text-bold ">1</p>
        </div>
        </div>
        <div className="flex flex-col bg-zinc-900 mb-12 rounded-sm">
        <div className="flex flex-row space-x-3 pr-2 pl-2 justify-between">
            <div className="bg-zinc-800 w-52 flex flex-col z-10 mt-2 laptop:h-72 h-72 rounded-sm shadow-md shadow-zinc-900">
            <img alt="club" className="p-4" src={process.env.PUBLIC_URL+'/club.png'}/>
            <div className="bg-primary-700 rounded-full w-12 h-12 m-auto mb-4 flex shadow shadow-zinc-900">
                <p className="text-secondary m-auto text-2xl text-bold">2</p>
            </div>
            </div>
            <div className="bg-zinc-800 w-52 flex flex-col z-10 mt-2 laptop:h-72 h-72 rounded-sm shadow-md shadow-zinc-900">
            <img alt="players" className="p-4" src={process.env.PUBLIC_URL+'/players.png'}/>
            <div className="bg-primary-700 rounded-full w-12 h-12 m-auto mb-4 flex shadow shadow-gray-900">
                <p className="text-secondary m-auto text-2xl text-bold">3</p>
            </div>
            </div>
            <div className="bg-zinc-800 w-52 flex flex-col z-10 mt-2 laptop:h-72 h-72 rounded-sm shadow-md shadow-zinc-900">
            <img alt="import players" className="p-4 " src={process.env.PUBLIC_URL+'/import_players.gif'}/>
            <div className="bg-primary-700 rounded-full w-12 h-12 m-auto mb-4 flex shadow shadow-gray-900">
                <p className="text-secondary m-auto text-2xl text-bold">4</p>
            </div>
            </div>
        </div>
        <p className="my-auto text-2xl font-light ">Inside the FUT App</p>
        </div>
        <div className="bg-zinc-800 flex flex-col mt-2 mb-24 w-52 laptop:h-72 h-72 rounded-sm shadow-md shadow-zinc-900">
        <div className="ml-4 mr-4 mt-8 h-16">

        <div className={" w-44 h-16"}>
            {!importPlayersClicked ? <span>Import your players first!</span> : <></>}
            <SecondaryButton title={"Done"} onClick={onGetPlayers} disabled={!importPlayersClicked}/>
        </div>
        </div>
        <div className="bg-primary-700 rounded-full w-12 h-12 m-auto mb-4 flex shadow shadow-gray-900">
            <p className="text-secondary m-auto text-2xl text-bold z-40">5</p>
        </div>
        </div>
    </div>
    {/* { importError ? <ImportErrorView/> : null} */}
</div>
}

export default ImportPlayersView
