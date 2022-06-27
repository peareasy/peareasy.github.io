import {useLocation, useNavigate, useParams} from "react-router";
import CardSBC from "../../components/UI/CardSBC";
import {PrimaryButton} from "../../components/UI/Button";
import {useEffect, useState} from "react";
import SolutionView from "../../components/UI/SolutionView";
import {Solution} from "../../interfaces/Solution";
import * as api from "../../api/publicApi";
import * as otherApi from "../../api/sbcLambda";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal";
import {useSelector} from "react-redux";
import {getUserSelector} from "../../redux/user/userSlice";
import ReactGA from "react-ga4";

const SBCPage = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [selectedSBC, setSelectedSBC] = useState<number>(-1)
  const [clickedRestrictedSBC, setClickedRestrictedSBC] = useState(false)
  const emptySolution = (): Solution => ({cost: 0, chem: 0, rating: 0, players: [], formation: "", solution_message: ""})
  const [solution, setSolution] = useState<Solution>(emptySolution)
  const [showSolution, setShowSolution] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sbcs, setSBCs] = useState<any[]>([])
  const user = useSelector(getUserSelector)
  const [error, setError] = useState("")

  let { id } = useParams();
  useEffect(() => {
      otherApi.getSBCsWithId(id).then(res => setSBCs(res))
  }, [id]);

  const onSolveSBC = (index: number) => {
    setLoading(true)
      ReactGA.event({
        category: "SolveSBC",
        action: "click_solve_sbc",
      });
    api.solveSBC(sbcs[index].challengeId, user.data?.email || null)
      .then((solution: Solution) => {
        console.log("solution", solution);
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
      <p>
        Our team has been notified and we are working hard on improving our solver! 
      </p>
      <p>
        In the meantime, try one of the other SBCs!  
      </p>
      <div className="pt-10 flex justify-around pb-10 ">
        <PrimaryButton onClick={() => {
          setSelectedSBC(-1)
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
        setSolution(emptySolution)
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
        let imgUrl
        if (sbc.challengeImageId) {
          imgUrl = `https://www.ea.com/fifa/ultimate-team/web-app/content/22747632-e3df-4904-b3f6-bb0035736505/2022/fut/sbc/companion/challenges/images/sbc_challenge_image_${sbc.challengeImageId}.png`
        } else {
          // TODO: This is needed when the SBC set only has 1 SBC
          imgUrl = `https://www.ea.com/fifa/ultimate-team/web-app/content/22747632-e3df-4904-b3f6-bb0035736505/2022/fut/sbc/companion/sets/images/sbc_set_image_${sbc.setImageId.split('_')[1]}.png`
        }

        return <CardSBC title={sbc.name}
                 key={sbc.name + index}
                 changeImg={imgUrl || ''}
                 restricted={sbc.restricted}
                 platform={user.data?.platform}
                 dontHidePlatformMessage={true}
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
                   body={<span>You need to login to solve this SBC</span>}
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
                   positiveActionButtonLabel={'Login'}
                   negativeActionButtonLabel="Cancel"/>
  }

  
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
    {view}
    {clickedRestrictedSBC ? modal : null}
  </>
}

export default SBCPage