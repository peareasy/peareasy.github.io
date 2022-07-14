import { PrimaryButton } from "../../../components/UI/Button"
import { open_link as openLinkIcon } from "../../../components/UI/icons"

const InstallExtensionView = () => <div className="space-y-12 text-center">
    <h1 className="text-xl">
    You need our Chrome extension to import your players
    </h1>
    <p className="text-xl">
    Please refresh the application once you have downloaded the extension 🔄
    </p>
    <img alt={"img"} className="m-auto w-1/4" src={process.env.PUBLIC_URL+'/chrome.svg'}/>
    <PrimaryButton title={"Download Extension"} icon={openLinkIcon} onClick={() =>
    window.open(
        'https://chrome.google.com/webstore/detail/auto-sbc/mchecdiinfipdfihkoebfbpfnllbllhc?hl=en-GB',
        '_blank'
    )}/>
</div>

export default InstallExtensionView