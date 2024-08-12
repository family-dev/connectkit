import { LocaleProps } from './';

const nlNL: LocaleProps = {
  connectWallet: 'Wallet Verbinden',
  disconnect: 'Verbreek Verbinding',
  connected: 'Verbonden',
  wrongNetwork: 'Verkeerd Netwerk',
  switchNetworks: 'Wissel van Netwerk',
  chainNetwork: '{{ CHAIN }} Netwerk',
  copyToClipboard: 'Kopieer naar Klembord',
  copyCode: 'Kopieer Code',
  moreInformation: 'Meer Informatie',
  back: 'Terug',
  close: 'Sluiten',
  or: 'of',
  more: 'Meer',
  tryAgain: 'Probeer Opnieuw',
  tryAgainQuestion: 'Opnieuw Proberen?',
  dontHaveTheApp: 'Heb je de app niet?',
  scanTheQRCode: 'Scan de QR code',
  useWalletConnectModal: 'Gebruik WalletConnect Modal',
  useModal: 'Gebruik Modal',
  installTheExtension: 'Installeer de Extensie',
  getWalletName: 'Verkrijg {{ CONNECTORNAME }}',
  otherWallets: 'Andere Wallets',
  learnMore: 'Meer Leren',
  getWallet: 'Verkrijg een Wallet',
  approveInWallet: 'Goedkeuren in Wallet',
  confirmInWallet: 'Bevestig in Wallet',
  awaitingConfirmation: 'Wachten op Bevestiging',
  signIn: 'Inloggen',
  signOut: 'Uitloggen',
  signedIn: 'Ingelogd',
  signedOut: 'Uitgelogd',
  walletNotConnected: 'Wallet niet Verbonden',

  warnings_walletSwitchingUnsupported: `Je wallet ondersteunt het wisselen van netwerk vanuit deze app niet.`,
  warnings_walletSwitchingUnsupportedResolve: `Probeer het netwerk te wisselen vanuit je wallet.`,
  warnings_chainUnsupported: `Deze app ondersteunt het huidige verbonden netwerk niet.`,
  warnings_chainUnsupportedResolve: `Wissel of verbreek de verbinding om door te gaan.`,

  onboardingScreen_heading: `Verkrijg een Wallet`,
  onboardingScreen_h1: `Begin met het Ontdekken van Web3`,
  onboardingScreen_p: `Je wallet is de toegang tot alles van Ethereum, de magische technologie die het mogelijk maakt om Web3 te ontdekken.`,
  onboardingScreen_ctaText: `Kies je eerste Wallet`,
  onboardingScreen_ctaUrl: `https://ethereum.org/nl/wallets/find-wallet/`,

  aboutScreen_heading: `Over Wallets`,
  aboutScreen_a_h1: `Voor jouw digitale activa`,
  aboutScreen_a_p: `Wallets laten je digitale activa zoals NFT's en andere Ethereum-tokens verzenden, ontvangen, opslaan en ermee omgaan.`,
  aboutScreen_b_h1: `Een betere manier om in te loggen`,
  aboutScreen_b_p: `Met moderne apps kan je wallet worden gebruikt als een gemakkelijke manier om in te loggen, in plaats van een wachtwoord te onthouden.`,
  aboutScreen_c_h1: `Verken de wereld van Web3`,
  aboutScreen_c_p: `Je wallet is een essentiële tool waarmee je de snel veranderde wereld van Web3 kunt verkennen en eraan kunt deelnemen.`,
  aboutScreen_ctaText: `Meer Leren`,
  aboutScreen_ctaUrl: `https://ethereum.org/nl/wallets/`,

  connectorsScreen_heading: `Wallet Verbinden`,
  connectorsScreen_newcomer: `Ik heb geen wallet`,
  connectorsScreen_h1: `Wat is een wallet?`,
  connectorsScreen_p: `Wallets worden gebruikt om digitale activa te verzenden, ontvangen en op te slaan. Het verbinden van een wallet laat je omgaan met apps.`,

  mobileConnectorsScreen_heading: `Kies een Wallet`,

  scanScreen_heading: `Scan met je Telefoon`,
  scanScreen_heading_withConnector: `Scan met {{ CONNECTORNAME }}`,
  scanScreen_tooltip_walletConnect: `Open een [WALLETCONNECTLOGO] WalletConnect ondersteunde wallet om te scannen`,
  scanScreen_tooltip_default: `Open {{ CONNECTORNAME }} op je mobiele telefoon om te scannen`,

  downloadAppScreen_heading: `Verkrijg {{ CONNECTORNAME }}`,
  downloadAppScreen_iosAndroid: `Scan met de camera van je telefoon om op iOS of Android te downloaden.`,
  downloadAppScreen_ios: `Scan met de camera van je telefoon om op iOS te downloaden.`,
  downloadAppScreen_android: `Scan met de camera van je telefoon om op Android te downloaden.`,

  injectionScreen_unavailable_h1: `Niet ondersteunde Browser`,
  injectionScreen_unavailable_p: `Om je {{ CONNECTORSHORTNAME }} wallet te verbinden, installeer de extensie op {{ SUGGESTEDEXTENSIONBROWSER }}.`,

  injectionScreen_install_h1: `Installeer {{ CONNECTORNAME }}`,
  injectionScreen_install_p: `Om je {{ CONNECTORSHORTNAME }} wallet te verbinden, installeer de extensie.`,

  injectionScreen_connecting_h1: `Verbindingsverzoek`,
  injectionScreen_connecting_p: `Open de {{ CONNECTORSHORTNAME }} browser extensie om je wallet te verbinden.`,
  injectionScreen_connecting_injected_h1: `Verbindingsverzoek`,
  injectionScreen_connecting_injected_p: `Accepteer het verzoek via je wallet om verbinding te maken met deze app.`,

  injectionScreen_connected_h1: `Al Verbonden`,
  injectionScreen_connected_p: `Je kunt dit venster nu sluiten`,

  injectionScreen_rejected_h1: `Verzoek Geannuleerd`,
  injectionScreen_rejected_p: `Je hebt het verzoek geannuleerd. Klik hierboven om het opnieuw te proberen.`,

  injectionScreen_failed_h1: `Verbinding Mislukt`,
  injectionScreen_failed_p: `Sorry, er is iets misgegaan. Probeer opnieuw verbinding te maken.`,

  injectionScreen_notconnected_h1: `Login bij {{ CONNECTORNAME }}`,
  injectionScreen_notconnected_p: `Om door te gaan, log in op je {{ CONNECTORNAME }} extensie.`,

  profileScreen_heading: 'Verbonden',

  switchNetworkScreen_heading: 'Wissel van Netwerk',

  signInWithEthereumScreen_tooltip:
    'Je bent niet ingelogd bij deze app.\n**Log In met Ethereum** om door te gaan.',

  signInWithEthereumScreen_signedOut_heading: 'Log In met Ethereum',
  signInWithEthereumScreen_signedOut_h1:
    'Deze app wil je verifiëren als eigenaar van deze wallet.',
  signInWithEthereumScreen_signedOut_p: `Onderteken het berichtverzoek in je wallet om door te gaan.`,
  signInWithEthereumScreen_signedOut_button: 'Inloggen',

  signInWithEthereumScreen_signedIn_heading: 'Ingelogd met Ethereum',
  signInWithEthereumScreen_signedIn_h1:
    'Je hebt jezelf succesvol geverifieerd als eigenaar van deze wallet.',
  signInWithEthereumScreen_signedIn_p: `Uitloggen vereist dat je je in de toekomst opnieuw verifieert.`,
  signInWithEthereumScreen_signedIn_button: 'Uitloggen',
};

export default nlNL;
