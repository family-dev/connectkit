import { LocaleProps } from './';

const zhTW: LocaleProps = {
  connectWallet: '連接錢包',
  disconnect: '斷開連接',
  connected: '已連接',
  wrongNetwork: '錯誤網路',
  switchNetworks: '切換網路',
  chainNetwork: '{{ CHAIN }}網路',
  copyToClipboard: '複製到剪貼簿',
  copyCode: '複製程式碼',
  moreInformation: '更多資訊',
  back: '返回',
  close: '關閉',
  or: '或',
  more: '更多',
  tryAgain: '再試一次',
  tryAgainQuestion: '再試一次？',
  dontHaveTheApp: '沒有這個應用程式？',
  scanTheQRCode: '掃描 QR 碼',
  useWalletConnectModal: '使用 WalletConnect 彈窗',
  useModal: '使用彈窗',
  installTheExtension: '安裝擴充功能',
  getWalletName: '取得{{ CONNECTORNAME }}',
  otherWallets: '其他錢包',
  learnMore: '了解更多',
  getWallet: '取得錢包',
  approveInWallet: '在錢包中批准',
  confirmInWallet: '在錢包中確認',
  awaitingConfirmation: '等待確認',
  signIn: '登入',
  signOut: '登出',
  signedIn: '已登入',
  signedOut: '已登出',
  walletNotConnected: '錢包未連接',

  warnings_walletSwitchingUnsupported: `您的錢包不支援從此應用程式切換網路。`,
  warnings_walletSwitchingUnsupportedResolve: `請嘗試從錢包中切換網路。`,
  warnings_chainUnsupported: `此應用程式不支援目前連接的網路。`,
  warnings_chainUnsupportedResolve: `請切換網路或斷開連接以繼續。`,

  onboardingScreen_heading: `取得錢包`,
  onboardingScreen_h1: `開始探索 Web3`,
  onboardingScreen_p: `您的錢包是通往以太坊的一扇大門，而以太坊是探索 Web3 的一項神奇技術。`,
  onboardingScreen_ctaText: `選擇您的第一個錢包`,
  onboardingScreen_ctaUrl: `https://ethereum.org/zh-tw/wallets/find-wallet/`,

  aboutScreen_heading: `關於錢包`,
  aboutScreen_a_h1: `對於您的數位資產`,
  aboutScreen_a_p: `有了錢包，您可以傳送、接收、存儲數位資產並與之互動，例如 NFT 和其他以太坊代幣。`,
  aboutScreen_b_h1: `更好的登入方式`,
  aboutScreen_b_p: `使用現代應用程式，您的錢包可以作為方便的登入方式，而無需記住密碼。`,
  aboutScreen_c_h1: `探索 Web3 世界`,
  aboutScreen_c_p: `您的錢包是一個重要的工具，可以讓您探索並參與快速發展的 Web3 世界。`,
  aboutScreen_ctaText: `了解更多`,
  aboutScreen_ctaUrl: `https://ethereum.org/zh-tw/wallets/`,

  connectorsScreen_heading: `連接錢包`,
  connectorsScreen_newcomer: `我沒有錢包`,
  connectorsScreen_h1: `什麼是錢包？`,
  connectorsScreen_p: `錢包可用於傳送、接收和存儲數位資產。通過連接錢包，您可以與應用程式互動。`,

  mobileConnectorsScreen_heading: `選擇錢包`,

  scanScreen_heading: `手機掃描`,
  scanScreen_heading_withConnector: `手機掃描{{ CONNECTORNAME }}`,
  scanScreen_tooltip_walletConnect: `打開 [WALLETCONNECTLOGO] WalletConnect 支援的錢包進行掃描`,
  scanScreen_tooltip_default: `打開您手機上的{{ CONNECTORNAME }}進行掃描`,

  downloadAppScreen_heading: `取得{{ CONNECTORNAME }}`,
  downloadAppScreen_iosAndroid: `使用手機相機掃描以下載 iOS 或 Android 應用程式。`,
  downloadAppScreen_ios: `使用手機相機掃描以下載 iOS 應用程式。`,
  downloadAppScreen_android: `使用手機相機掃描以下載 Android 應用程式。`,

  injectionScreen_unavailable_h1: `不支援的瀏覽器`,
  injectionScreen_unavailable_p: `要連接您的{{ CONNECTORSHORTNAME }}錢包，請在{{ SUGGESTEDEXTENSIONBROWSER }}上安裝此擴充功能。`,

  injectionScreen_install_h1: `安裝{{ CONNECTORNAME }}`,
  injectionScreen_install_p: `要連接您的{{ CONNECTORSHORTNAME }}錢包，請安裝此瀏覽器擴充功能。`,

  injectionScreen_connecting_h1: `請求連接`,
  injectionScreen_connecting_p: `打開{{ CONNECTORSHORTNAME }}瀏覽器擴充功能以連接您的錢包。`,
  injectionScreen_connecting_injected_h1: `請求連接`,
  injectionScreen_connecting_injected_p: `通過您的錢包接受請求，以連接到此應用程式。`,

  injectionScreen_connected_h1: `已連接`,
  injectionScreen_connected_p: `現在可以關閉此彈窗`,

  injectionScreen_rejected_h1: `請求已取消`,
  injectionScreen_rejected_p: `您已取消請求。點擊上方可重試。`,

  injectionScreen_failed_h1: `連接失敗`,
  injectionScreen_failed_p: `抱歉，發生錯誤。請嘗試重新連接。`,

  injectionScreen_notconnected_h1: `登入{{ CONNECTORNAME }}`,
  injectionScreen_notconnected_p: `要繼續，請登入到您的{{ CONNECTORNAME }}擴充功能。`,

  profileScreen_heading: '已連接',

  switchNetworkScreen_heading: '切換網路',

  signInWithEthereumScreen_tooltip:
    '您尚未登入到此應用程式。\n請選擇**使用以太坊登入**以繼續。',
  signInWithEthereumScreen_signedOut_heading: '使用以太坊登入',
  signInWithEthereumScreen_signedOut_h1: '此應用程式希望驗證您是此錢包的所有者。',
  signInWithEthereumScreen_signedOut_p: `請簽署錢包中的訊息請求以繼續。`,
  signInWithEthereumScreen_signedOut_button: '登入',

  signInWithEthereumScreen_signedIn_heading: '已使用以太坊登入',
  signInWithEthereumScreen_signedIn_h1: '您已成功驗證自己是此錢包的所有者。',
  signInWithEthereumScreen_signedIn_p: `登出後，將來您還需要再次進行身份驗證。`,
  signInWithEthereumScreen_signedIn_button: '登出',
};

export default zhTW;
