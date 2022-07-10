const DownloadExtension = () => {

  // const extensionId = process.env.REACT_APP_EXTENSION_ID!
  // const [extensionInstalled, setExtensionInstalled] = useState(false)
  
  // const sendUUIDToExtension = useCallback(() => {
  //   if (window.chrome?.runtime) {
  //     setLoading(true)
  //     window.chrome.runtime.sendMessage(
  //       extensionId,
  //       {
  //         uuid: cookies["userId"]
  //       }, (res) => {
  //         setLoading(false)
  //         setExtensionInstalled(res.msg === 'confirmation')
  //       });
  //   } else {
  //     setLoading(false)
  //     console.error("window.chrome not available");
  //   }
  // }, [cookies, extensionId]);



  // useEffect(() => {
  //   if (!cookies["userId"]) {
  //     setStep(Steps.HasNotAcceptedTos)
  //   } else {
  //     if (extensionInstalled) {
  //       setStep(Steps.ImportPlayers)
  //     } else {
  //       setStep(Steps.DownloadExtension)
  //     }
  //     sendUUIDToExtension()
  //     api.verifyUser(cookies["userId"]);
  //     dispatch(fetchSbcs())
  
  //     setUserId(cookies["userId"])
  //   }
  // }, [sendUUIDToExtension, Steps.DownloadExtension, Steps.HasNotAcceptedTos, Steps.ImportPlayers, cookies, extensionId, extensionInstalled, dispatch])

//  const nonChromeView = (<div className="space-y-8">
//     <h1 className="text-3xl font-bold mx-auto h-4/5 overflow-y-auto">
//       Oh no, you are not using Chrome! 😔
//     </h1>
//     <p>In order for you to use our Chrome extension to import your players, you have to use this site from a Chrome browser!</p>
//   </div>)

//   const getChromeExtensionView = <div className="space-y-12 text-center">
//     <h1 className="text-xl">
//       You need our Chrome extension to import your players
//     </h1>
//     <p className="text-xl">
//       Please refresh the application once you have downloaded the extension 🔄
//     </p>
//     <img alt={"img"} className="m-auto w-1/4" src={process.env.PUBLIC_URL+'/chrome.svg'}/>
//     <PrimaryButton title={"Download Extension"} icon={openLinkIcon} onClick={() =>
//       window.open(
//         'https://chrome.google.com/webstore/detail/auto-sbc/mchecdiinfipdfihkoebfbpfnllbllhc?hl=en-GB',
//         '_blank'
//       )}/>
//   </div>
}

export default DownloadExtension