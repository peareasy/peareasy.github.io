import {useLocation, useNavigate, useParams} from "react-router";
import CardSBC from "../../components/UI/CardSBC";
import {PrimaryButton} from "../../components/UI/Button";
import {useEffect, useState} from "react";
import SolutionView from "../../components/UI/SolutionView";
import {Solution} from "../../interfaces/Solution";
import * as publicApi from "../../api/publicApi";
import * as privateApi from "../../api/privateApi";
import * as otherApi from "../../api/sbcLambda";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {fetchUser} from "../../redux/user/userSlice";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal";
import {useSelector} from "react-redux";
import {getUserSelector} from "../../redux/user/userSlice";
import ReactGA from "react-ga4";
import Toggle from "../../components/Toggle";
import { Subscription } from "../../enums/Subscription.enum";


// TODO: If no user, dispatch fetchUser

const SBCPage = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [selectedSBC, setSelectedSBC] = useState<number>(-1)
  const [clickedRestrictedSBC, setClickedRestrictedSBC] = useState(false)
  const emptySolution = (): Solution => ({cost: 0, chem: 0, rating: 0, players: [], formation: "", solution_message: ""})
  const [solution, setSolution] = useState<Solution>(emptySolution)
  const [showSolution, setShowSolution] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sbcs, setSBCs] = useState<any[]>([])
  const user = useSelector(getUserSelector)
  const [error, setError] = useState("")
  const sbcIconBaseUrl = "https://www.ea.com/fifa/ultimate-team/web-app/content/22747632-e3df-4904-b3f6-bb0035736505/2022/fut/sbc/companion/";
  const [importPlayersModal, setImportPlayersModal] = useState(false)
  let { id } = useParams();
  // helpers
  const isMarqueeMatchup = id?.includes("Marquee Matchups")
  
  const hasImportedPlayers = user?.data?.playerCount > 0
  
  const isGoldUser = user?.data?.subscription === Subscription.GOLD
  
  const importEnabled = hasImportedPlayers && (isMarqueeMatchup || isGoldUser)
  
  // ---
  const [useImportedPlayers, setUseImportedPlayers] = useState(importEnabled)
  const [solvedSBCWithOwnPlayers, setSolvedSBCWithOwnPlayers] = useState(false)

  useEffect(() => {
      otherApi.getSBCsWithId(id).then(res => setSBCs(res))
      if (!user) {
        dispatch(fetchUser())
        setUseImportedPlayers(importEnabled)
      }
  }, [id, user, dispatch, importEnabled]);

  const onToggle = (toggle: boolean) => {
    if (!importEnabled) {
      setImportPlayersModal(true)
    } else {
      setUseImportedPlayers(toggle)
    }
  }
  const onSolveSBC = (index: number) => {
    setLoading(true)
      ReactGA.event({
        category: "SolveSBC",
        action: "click_solve_sbc",
      });
    publicApi.solveSBC(sbcs[index].challengeId, user.data?.uuid || null, useImportedPlayers)
      .then((solution: Solution) => {
        if (solution.players.length === 0){
          setError(solution.solution_message);
          ReactGA.event({
            category: "SolveSBC",
            action: "solve_sbc_error",
          })
          setLoading(false)
        } else {
          ReactGA.event({
            category: "SolveSBC",
            action: "solve_sbc_success",
          })
          const {players, cost, chem, rating, solution_message} = solution;
          const formation = sbcs[index].formation
          setError("")
          setSolution({players, cost, chem, rating, formation, solution_message})
          setShowSolution(true)
          setLoading(false)
        }
      })
      .catch((e) => {
        ReactGA.event({
          category: "SolveSBC",
          action: "solve_sbc_error",
        })
        setError(e)
        setShowSolution(false)
        setLoading(false)
      })
  }

  const onSBCClicked = (index: number, restricted: boolean) => {
    if (restricted && !user.data) {
      setClickedRestrictedSBC(true)
    } else {
      setSelectedSBC(index)
      onSolveSBC(index)
    }
  }

  const errorView = (
    <div className={'space-y-2 text-secondary justify-around m-auto text-center'}>
      <h1 className="text-2xl font-bold mb-4">
        Sorry, we couldn't find a solution! 
      </h1>
      {error && importEnabled ?
          <p>{error}</p> :
          <p>
            Our team has been notified and we are working hard on improving our solver!
          </p>
      }

      <p>
        In the meantime, try one of the other SBCs!  
      </p>
      <div className="pt-10 flex justify-around pb-10 ">
        <PrimaryButton onClick={() => {
          setSolution(emptySolution)
          setError("")
        }} title={"Try another one!"}/>
      </div>
    </div>
  )
  const solutionView = <div>
    {sbcs ? <SolutionView solution={solution} sbc={sbcs[selectedSBC]} /> : <></>}
    <div className="pt-10 flex justify-around pb-10 ">
      <PrimaryButton onClick={() => {
        setShowSolution(false)
        if (useImportedPlayers) {
          setSolvedSBCWithOwnPlayers(true)
        }
      }} title={"Solve another SBC"}/>
    </div>
  </div> 

  const loadingView = <div className="space-y-4 text-secondary m-auto text-center">
    <h1 className="text-2xl mx-auto h-4/5 font-light">
      Our AI is working hard to get you a good solution.
    </h1>
    <h1 className="text-xl mx-auto pb-12 font-light text-gray-200">This might take up to 20 seconds 👊🏽</h1>
    <Spinner/>
  </div>
  

  
  const SBCsView = <>
      {sbcs && sbcs.length > 0 ? 
      <div className={sbcs.length === 1 ? "md:w-3/5 gap-4 pb-2 w-1/5 m-auto" : "grid grid-cols-2 md:grid-cols-1 md:w-3/5 gap-4 pb-2 w-1/2 m-auto"}>
      {sbcs.map((sbc, index) => { 
        
        const imgUrl = sbc.ImageURL;

        const restrictedMarqueeSbc = !!id?.includes("Marquee Matchups") && index > 0 && !user.data;

        return <CardSBC title={sbc.name}
                 key={sbc.name + index}
                 changeImg={imgUrl || ''}
                 restricted={restrictedMarqueeSbc}
                 platform={user.data?.platform}
                 showPlatformMsg={true}
                 is_marquee_match_up={location.pathname.includes('Marquee')}
                 onClick={(description) => {
                   onSBCClicked(index, description)
                 }} />
                 
                })} </div> : <div className='m-auto'>
                 <Spinner/>
               </div>}
    
  </>
  let modal
  if (clickedRestrictedSBC && !user.data) {
    modal = <Modal header={'❗ You need to login in order to solve this SBC'}
                   body={<span>You need to log in to solve this SBC</span>}
                   onNegativeActionClicked={() => {
                     setClickedRestrictedSBC(false)
                   }}
                   onPositiveActionClicked={() => {
                     setClickedRestrictedSBC(false)
                     navigate('/login')
                   }}
                   onCloseClicked={() => {
                     setClickedRestrictedSBC(false)
                   }}
                   positiveActionButtonLabel={'Log in'}
                   negativeActionButtonLabel="Cancel"/>
  } else if (importPlayersModal) {
    modal = <Modal header={'❗ A player Import is required'}
      body={<span>Do you want to import players now?</span>}
      onNegativeActionClicked={() => {
        setImportPlayersModal(false)
      }}
      onPositiveActionClicked={() => {
        setImportPlayersModal(false)
        navigate('/import')
      }}
      onCloseClicked={() => {
        setImportPlayersModal(false)
      }}
      positiveActionButtonLabel={'Import Players'}
      negativeActionButtonLabel="Cancel"/>
  } else if (solvedSBCWithOwnPlayers) {
    modal = <Modal header={"❗ Did you use this solution?"}
                            body={<span>
                              If you want to solve a new SBC we want to make sure that your old players are removed from our database.
                              Please indicate if you used our generated solution
                            </span>}
                            onNegativeActionClicked={() => {
                              setSolution(emptySolution)
                              setSolvedSBCWithOwnPlayers(false)
                            }}
                            onPositiveActionClicked={() => {
                              privateApi.deletePlayersUsedInSBCs(
                                  user.data.uuid,
                                  solution.players.map((player) => player.resource_id)
                                )
                              dispatch(fetchUser())
                              setSolution(emptySolution)
                              setSolvedSBCWithOwnPlayers(false)
                            }}
                            onCloseClicked={() => {
                              setSolution(emptySolution)
                              setSolvedSBCWithOwnPlayers(false)
                            }}
                            positiveActionButtonLabel="Yes"
                            negativeActionButtonLabel="No"/>
  }
  const toggleView = <div className='flex flex-col justify-center gap-y-2 mb-4'>
    <Toggle onToggle={(toggle) => onToggle(toggle)} disabled={!user.data || !(isGoldUser || isMarqueeMatchup)} toggleState={useImportedPlayers}/>
    {!user.data ? <span className='text-gray-300 text-sm m-auto italic'>Login to import</span> : null}
    {!(isGoldUser || isMarqueeMatchup) ? <span className='text-gray-300 text-sm m-auto italic'>Buy elite subscription to use import for all SBCs</span> : null}
  </div>
  
  let view;
  if (loading) {
    view = loadingView;
  } else if (error) {
    view = errorView;
  } else if (showSolution) {
    view = solutionView;
  } else {
    view = SBCsView;
  }
  return <>
  <div className="flex flex-row pr-32 md:mb-4">
    <div className="p-2 bg-gray-700 rounded inline-block ml-auto">
      <p className="text-green-500 text-right text-sm md:text-center inline-block items-end">
        {user?.data?.playerCount ? user?.data?.playerCount : 0 } players imported{user?.data?.lastImportedAt ?  ' - '+
          String(user?.data?.lastImportedAt).slice(0,10) 
          + ' ' +String(user?.data?.lastImportedAt).slice(11,16) + ' GMT' : ''}</p>
    </div>
  </div>
    { showSolution ? null : toggleView }
    {view}
    {importPlayersModal || clickedRestrictedSBC || solvedSBCWithOwnPlayers? modal : null}
  </>
}

export default SBCPage
