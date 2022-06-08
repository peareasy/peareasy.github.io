import {SBC} from "../../interfaces/SBC";
import {useLocation, useNavigate} from "react-router";
import CardSBC from "../../components/UI/CardSBC";
import {PrimaryButton} from "../../components/UI/Button";
import React, {useState} from "react";
import SolutionView from "../../components/UI/SolutionView";
import {Solution} from "../../interfaces/Solution";
import * as api from "../../api/publicApi";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal";
import {useSelector} from "react-redux";
import {getUserSelector} from "../../redux/user/userSlice";
import ReactGA from "react-ga4";

const SBCPage = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const sbcs = (location?.state as SBC[])|| undefined
  const [selectedSBC, setSelectedSBC] = useState<number>(-1)
  const [clickedRestrictedSBC, setClickedRestrictedSBC] = useState(false)
  const emptySolution = (): Solution => ({cost: 0, chem: 0, rating: 0, players: [], formation: "", solution_message: ""})
  const [solution, setSolution] = useState<Solution>(emptySolution)
  const [showSolution, setShowSolution] = useState(false)
  const [loading, setLoading] = useState(false)
  const user = useSelector(getUserSelector)

  const onSolveSBC = (index: number) => {
    setLoading(true)
      ReactGA.event({
        category: "SolveSBC",
        action: "click_solve_sbc",
      });
    api.solveSBC(sbcs[index].name)
      .then((solution: Solution) => {
        ReactGA.event({
          category: "SolveSBC",
          action: "solve_sbc_success",
        })
        const {formation, players, cost, chem, rating, solution_message} = solution;
        setSolution({players, cost, chem, rating, formation, solution_message})
        setShowSolution(true)
        setLoading(false)
      })
      .catch(() => {
        ReactGA.event({
          category: "SolveSBC",
          action: "solve_sbc_error",
        })
        setShowSolution(false)
        setLoading(false)
      })
  }

  const onSBCClicked = (index: number, restricted: boolean, is_marquee_match_up?: boolean) => {
    if (restricted && !user.data) {
      setClickedRestrictedSBC(true)
    } else {
      setSelectedSBC(index)
      onSolveSBC(index)
    }
  }

  const solutionView = <div>
    <SolutionView solution={solution} sbc={sbcs[selectedSBC]} />
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
    <div className="grid grid-cols-2 md:grid-cols-1 md:w-3/5 gap-4 pb-2 w-1/2 m-auto">
      {sbcs.length > 0 ? sbcs.map((sbc, index) =>
        <CardSBC title={sbc.name}
                 key={sbc.name}
                 changeImg={sbc.icon_url}
                 restricted={sbc.restricted}
                 is_marquee_match_up={sbc.marquee_match_up}
                 onClick={(description, is_marquee_match_up?: boolean) => {
                   onSBCClicked(index === selectedSBC ? -1 : index, description, is_marquee_match_up)
                 }} />) : null}
    </div>
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
  let view
  if (loading) {
    view = loadingView
  } else if (showSolution) {
    view = solutionView
  } else {
    view = SBCsView
  }

  return <>
    {view}
    {clickedRestrictedSBC ? modal : null}
  </>
}

export default SBCPage