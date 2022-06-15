import Modal from "./Modal";

type Props = {
    onClick: () => void;
}
export const NotifyClickedModal = ({onClick}: Props) => (
    <Modal header={"Thank you!"} 
            body={
            <span>
                You will now get notified when the premium subscription is out!
                <br/> 
                <br/> 
                Join our  
                <a href={'https://discord.gg/hcvAa8ve'}
                   target="_blank" rel="noreferrer"
                >
              <span> discord</span>
            </a> for more updates or if you have any feedback
            </span>} 
            notShowNegativeButton
            onCloseClicked={onClick} 
            onNegativeActionClicked={() => {}} 
            onPositiveActionClicked={onClick} 
            positiveActionButtonLabel={"Ok"} 
            negativeActionButtonLabel={""} />
)