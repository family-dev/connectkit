export type Languages =
  | 'ar-AE'
  | 'en-US'
  | 'ee-EE'
  | 'es-ES'
  | 'fa-IR'
  | 'fr-FR'
  | 'ja-JP'
  | 'pt-BR'
  | 'ca-AD'
  | 'ru-RU'
  | 'zh-CN'
  | 'tr-TR'
  | 'nl-NL'
  | 'vi-VN';

import { default as arAE } from './locales/ar-AE';
import { default as enUS } from './locales/en-US';
import { default as eeEE } from './locales/ee-EE';
import { default as esES } from './locales/es-ES';
import { default as faIR } from './locales/fa-IR';
import { default as frFR } from './locales/fr-FR';
import { default as jaJP } from './locales/ja-JP';
import { default as ptBR } from './locales/pt-BR';
import { default as ruRU } from './locales/ru-RU';
import { default as zhCN } from './locales/zh-CN';
import { default as caAD } from './locales/ca-AD';
import { default as trTR } from './locales/tr-TR';
import { default as viVN } from './locales/vi-VN';
import { default as nlNL } from './locales/nl-NL';

// TODO: tree-shaking
export const getLocale = (lang: Languages) => {
  switch (lang) {
    case 'ee-EE':
      return eeEE;
    case 'ar-AE':
      return arAE;
    case 'es-ES':
      return esES;
    case 'fa-IR':
      return faIR;
    case 'fr-FR':
      return frFR;
    case 'ja-JP':
      return jaJP;
    case 'pt-BR':
      return ptBR;
    case 'ru-RU':
      return ruRU;
    case 'zh-CN':
      return zhCN;
    case 'ca-AD':
      return caAD;
    case 'tr-TR':
      return trTR;
    case 'vi-VN':
      return viVN;
    case 'nl-NL':
      return nlNL;
    default:
      return enUS;
  }
};

/*
// Could be useful for locale files to use these keys rather than hard-coded into the objects
export const keys = {
  connectorName: '{{ CONNECTORNAME }}',
  connectorShortName: '{{ CONNECTORSHORTNAME }}',
  suggestedExtensionBrowser: '{{ SUGGESTEDEXTENSIONBROWSER }}',
  walletConnectLogo: '{{ WALLETCONNECTLOGO }}',
};
*/
