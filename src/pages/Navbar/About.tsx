import React from "react";
import {NavLink} from "react-router-dom";

const About = () => {
  return (
    <main className={'container mx-auto w-1/2 space-y-5 pb-10 pt-10 p-20 overflow-visible'}>
      <h3 className="text-secondary text-2xl text-left">What we offer</h3>
      <p className="text-secondary text-m text-left">
          Fast, automatic solutions to squad building challenges using players from your own club.
      </p>
      <p className="text-secondary text-m text-left">
          Note that when we load the players in your club, we NEVER interact with the web-app. We only read the player names in order to tailor solutions to your club!
      </p>
      <p className="text-secondary text-m text-left">
          Our AI will help you find a solution to almost any SBC, trying to use the players with least value in your club. All you have to do is sit back and enjoy opening your packs!
      </p>
      <p className="text-secondary text-m text-left">
          Our service is still at an early stage, but we are tirelessly working to improve the AI as well as the experience and services we offer.
      </p>
      <p className="text-secondary text-m text-left">
          Please feel free to contact us with any feedback or ideas through our <NavLink
          to={'contact'}>
          Contact page</NavLink>.
      </p>
      <h3 className="text-secondary text-2xl text-left">About us</h3>
      <p className="text-secondary text-m text-left">
          We have played a lot of FIFA Ultimate Team ourselves and know the pain of having to solve new SBCs all the time. In recent years we have been wondering whether it would be possible to solve them automatically... And here we are!
      </p>
    </main>
  )
}

export default About 
