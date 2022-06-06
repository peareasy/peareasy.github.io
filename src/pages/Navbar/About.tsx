import {NavLink} from "react-router-dom";

const About = ()  => {
  return (
    <main className={'container mx-auto w-1/2 space-y-5 pb-10 pt-10 p-20 overflow-visible'}>
      <h3 className="text-secondary text-2xl text-center">What We Offer</h3>
      <p className="text-secondary text-m text-left">
        Fast and cheap solutions to squad building challenges based on live player prices.
      </p>
      <p className="text-secondary text-m text-left">
        Our AI generates unique solutions just for you. This means that players in your solution will not increase all of a sudden in price, because everyone gets different solutions.
      </p>
      <p className="text-secondary text-m text-left">
        The AI uses fresh player prices which are updated approximately every 15th minute.
      </p>
      <h3 className="text-secondary text-2xl text-left text-center">Future Vision</h3>
      <p className="text-secondary text-m text-left">
        Our service is still at an early stage, but we are tirelessly working to improve the AI as well as the experience and services we offer.
      </p>
      <p className="text-secondary text-m text-left">
        Please feel free to contact us with any feedback or ideas through our <NavLink
            to={'/contact'}>
            Contact page</NavLink>.
      </p>
      <h3 className="text-secondary text-2xl text-left text-center">About Us</h3>
      <p className="text-secondary text-m text-left">
        We have played a lot of FIFA Ultimate Team ourselves and know the pain of having to solve new SBCs all the time. In recent years we have been wondering whether it would be possible to solve them automatically... And here we are!
      </p>
    </main>
  )
}


export default About 
