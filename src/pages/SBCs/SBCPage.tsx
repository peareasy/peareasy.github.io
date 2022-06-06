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

  const onSolveSBC = () => {
    setLoading(true)
    api.solveSBC(sbcs[selectedSBC].name)
      .then((solution: Solution) => {
        const {formation, players, cost, chem, rating, solution_message} = solution;
        setSolution({players, cost, chem, rating, formation, solution_message})
        setShowSolution(true)
        setLoading(false)
      })
      .catch(() => {
        setShowSolution(false)
        setLoading(false)
      })
  }

  const onSBCClicked = (index: number, restricted: boolean, is_marquee_match_up?: boolean) => {
    if (restricted && !user.data) {
      setClickedRestrictedSBC(true)
    } else {
      setSelectedSBC(index)
    }
  }

  const solutionView = <div>
    <SolutionView solution={solution} sbc={sbcs[selectedSBC]} />
    <div className="mt-10 top-10 bottom-10 left-0 right-0">
      <PrimaryButton onClick={() => setSolution(emptySolution)} title={"Solve another SBC"}/>
    </div>
  </div>

  const loadingView = <div className="space-y-4 text-secondary m-auto text-center">
    <h1 className="text-2xl mx-auto h-4/5 font-light">
      Our AI is working hard to get you a good solution.
    </h1>
    <h1 className="text-xl mx-auto pb-12 font-light text-gray-200">This might take up to 10 seconds 👊🏽</h1>
    <Spinner/>
  </div>

  const SBCsView = <>
    <div className="grid grid-cols-2 gap-4 pb-2 w-1/2 m-auto">
      {sbcs.length > 0 ? sbcs.map((sbc, index) =>
        <CardSBC title={sbc.name}
                 key={sbc.name}
                 changeImg={sbc.icon_url}
                 restricted={sbc.restricted}
                 is_marquee_match_up={sbc.marquee_match_up}
                 onClick={(description, is_marquee_match_up?: boolean) => {
                   onSBCClicked(index === selectedSBC ? -1 : index, description, is_marquee_match_up)
                 }}
                 selected={selectedSBC === index}/>) : null}
    </div>
    <div className="pt-10 flex justify-around pb-10">
      <PrimaryButton title={'Solve'} disabled={selectedSBC === -1} onClick={onSolveSBC}/>
    </div>
  </>

  let modal
  if (clickedRestrictedSBC && !user.data) {
    modal = <Modal header={'❗ You need to login in order to solve this SBC'}
                   body={<span>We kindly ask you to login</span>}
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
    view = solution
  } else {
    view = SBCsView
  }

  return <>
    {view}
    {clickedRestrictedSBC ? modal : null}
  </>
}

export default SBCPage