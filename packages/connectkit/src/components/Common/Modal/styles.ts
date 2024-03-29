import styled from './../../../styles/styled';
import { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import defaultTheme from '../../../constants/defaultTheme';

export const ErrorMessage = styled(motion.div)`
  z-index: -1;
  pointer-events: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: var(--width);
  top: 64px;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  background: var(--ck-body-color-danger);
  border-radius: 20px;
  padding: 24px 46px 82px 24px;
  transition: width var(--duration) var(--ease);
  a {
    font-weight: 700;
    text-decoration: underline;
  }
  code {
    font-size: 0.9em;
    display: inline-block;
    font-family: monospace;
    margin: 1px;
    padding: 0 4px;
    border-radius: 8px;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FadeIn = keyframes`
from { opacity: 0; }
  to { opacity: 1; }
`;

const FadeInScaleUp = keyframes`
from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`;

const FadeInScaleDown = keyframes`
from { opacity: 0; transform: scale(1.1); }
  to { opacity: 1; transform: scale(1); }
`;

const FadeOut = keyframes`
from { opacity: 1; }
  to { opacity: 0; }
`;

const FadeOutScaleUp = keyframes`
from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(1.1); }
`;

const FadeOutScaleDown = keyframes`
from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.85); }
`;

export const PageContent = styled(motion.div)`
  max-width: 100%;
  width: 295px;
  padding-top: 48px;
`;

export const TextWithHr = styled(motion.div)`
  user-select: none;
  position: relative;
  display: block;
  text-align: center;
  color: var(--ck-body-color-muted);
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  span {
    z-index: 2;
    position: relative;
    display: inline-block;
    user-select: none;
    pointer-events: none;
    padding: 0 14px;
    background: var(--ck-body-background);
    transition: background-color 200ms ease;
  }
  &:before {
    z-index: 2;
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    transform: translateY(-1px);
    background: var(--ck-body-divider);
    box-shadow: var(--ck-body-divider-box-shadow);
  }
`;
export const ModalHeading = styled(motion.div)`
  z-index: 3;
  pointer-events: none;
  user-select: none;
  position: absolute;
  top: 25px;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  transform: translateX(-50%);
  width: var(--width);
  text-align: center;
  font-size: 17px;
  line-height: 20px;
  font-weight: var(--ck-modal-heading-font-weight, 600);
  color: var(--ck-body-color);
  span {
    display: inline-block;
  }
`;

export const ModalContentContainer = styled(motion.div)`
  position: relative;
  padding: 0;
`;
export const ModalContent = styled(motion.div)`
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 0 16px;

  @media only screen and (max-width: ${defaultTheme.mobileWidth}px) {
    display: block;
  }
`;
export const ModalH1 = styled(motion.h1)<{
  $error?: boolean;
  $valid?: boolean;
  $small?: boolean;
}>`
  margin: 0;
  padding: 0;
  line-height: ${(props) => (props.$small ? 20 : 22)}px;
  font-size: ${(props) => (props.$small ? 17 : 19)}px;
  font-weight: var(--ck-modal-h1-font-weight, 600);
  color: ${(props) => {
    if (props.$error) return 'var(--ck-body-color-danger)';
    if (props.$valid) return 'var(--ck-body-color-valid)';
    return 'var(--ck-body-color)';
  }};
  > svg {
    position: relative;
    top: -2px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
  }
  @media only screen and (max-width: ${defaultTheme.mobileWidth}px) {
    margin-bottom: 6px;
    font-size: 17px;
  }
`;

export const ModalBody = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  color: var(--ck-body-color-muted);
  strong {
    font-weight: 500;
    color: var(--ck-body-color);
  }
`;

export const ModalBodySmall = styled.div`
  padding: 0 12px;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: var(--ck-body-color-muted);
  strong {
    font-weight: 500;
    color: var(--ck-body-color);
  }
`;

export const BackgroundOverlay = styled(motion.div)<{
  $active: boolean;
  $blur?: number;
}>`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--ck-overlay-background, rgba(71, 88, 107, 0.24));
  backdrop-filter: ${(props) =>
    props.$blur
      ? `blur(${props.$blur}px)`
      : 'var(--ck-overlay-backdrop-filter, none)'};
  opacity: 0;
  animation: ${(props) => (props.$active ? FadeIn : FadeOut)} 150ms ease-out
    both;
`;

const BoxIn = keyframes`
  from{ opacity: 0; transform: scale(0.97); }
  to{ opacity: 1; transform: scale(1); }
`;
const BoxOut = keyframes`
  from{ opacity: 1; transform: scale(1); }
  to{ opacity: 0; transform: scale(0.97); }
`;

const MobileBoxIn = keyframes`
  from { transform: translate3d(0, 100%, 0); }
  to { transform: translate3d(0, 0%, 0); }
`;

const MobileBoxOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const BoxContainer = styled(motion.div)`
  z-index: 2;
  position: relative;
  color: var(--ck-body-color);

  animation: 150ms ease both;
  animation-name: ${BoxOut};
  &.active {
    animation-name: ${BoxIn};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: var(--width);
    height: var(--height);
    transform: translateX(-50%);
    backface-visibility: hidden;
    transition: all 200ms ease;
    border-radius: var(--ck-border-radius, 20px);
    background: var(--ck-body-background);
    box-shadow: var(--ck-modal-box-shadow);
  }

  @media only screen and (max-width: ${defaultTheme.mobileWidth}px) {
    animation-name: ${MobileBoxOut};
    animation-duration: 130ms;
    animation-timing-function: ease;

    &.active {
      animation-name: ${MobileBoxIn};
      animation-duration: 300ms;
      animation-delay: 32ms;
      animation-timing-function: cubic-bezier(0.15, 1.15, 0.6, 1);
    }

    &:before {
      width: 100%;
      transition: 0ms height cubic-bezier(0.15, 1.15, 0.6, 1);
      will-change: height;
    }
  }
`;
export const ControllerContainer = styled(motion.div)`
  z-index: 3;
  position: absolute;
  top: 0;
  left: 50%;
  height: 64px;
  transform: translateX(-50%);
  backface-visibility: hidden;
  width: var(--width);
  transition: 0.2s ease width;
  pointer-events: auto;
  //border-bottom: 1px solid var(--ck-body-divider);
`;

export const InnerContainer = styled(motion.div)`
  position: relative;
  overflow: hidden;
  height: var(--height);
  transition: 0.2s ease height;
  @media only screen and (max-width: ${defaultTheme.mobileWidth}px) {
    transition: 0ms height cubic-bezier(0.15, 1.15, 0.6, 1);
    /* animation-delay: 34ms; */
  }
`;

export const PageContainer = styled(motion.div)`
  z-index: 2;
  position: relative;
  top: 0;
  left: 50%;
  margin-left: calc(var(--width) / -2);
  width: var(--width);
  /* left: 0; */
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center center;
  animation: 200ms ease both;

  &.active {
    animation-name: ${FadeInScaleDown};
  }
  &.active-scale-up {
    animation-name: ${FadeInScaleUp};
  }
  &.exit-scale-down {
    z-index: 1;
    pointer-events: none;
    position: absolute;
    /* top: 0; */
    /* left: 0; */
    animation-name: ${FadeOutScaleDown};
  }
  &.exit {
    z-index: 1;
    pointer-events: none;
    position: absolute;
    /* top: 0; */
    /* left: 0; */
    /* left: 50%; */
    /* transform: translateX(-50%); */
    animation-name: ${FadeOutScaleUp};
    animation-delay: 16.6667ms;
  }
  @media only screen and (max-width: ${defaultTheme.mobileWidth}px) {
    /* animation: 0ms ease both; */
    /* animation-delay: 35ms; */
    animation: 0ms cubic-bezier(0.15, 1.15, 0.6, 1) both;

    &.active {
      animation-name: ${FadeIn};
    }
    &.active-scale-up {
      animation-name: ${FadeIn};
    }
    &.exit-scale-down {
      z-index: 3;
      animation-name: ${FadeOut};
    }
    &.exit {
      z-index: 3;
      animation-name: ${FadeOut};
      animation-delay: 0ms;
    }
  }
`;
export const PageContents = styled(motion.div)`
  margin: 0 auto;
  width: fit-content;
  padding: 29px 24px 24px;
  backface-visibility: hidden;
`;

export const ModalContainer = styled.div`
  z-index: 2147483646; // z-index set one below max (2147483647) for if we wish to layer things ontop of the modal in a separate Portal
  position: fixed;
  inset: 0;
`;

export const CloseButton = styled(motion.button)`
  z-index: 3;
  cursor: pointer;
  position: absolute;
  top: 22px;
  right: 17px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  color: var(--ck-body-action-color);
  background: var(--ck-body-background);
  transition: background-color 200ms ease, transform 100ms ease;
  /* will-change: transform; */
  svg {
    display: block;
  }

  &:hover {
    background: var(--ck-body-background-secondary);
  }
  &:active {
    transform: scale(0.9);
  }
`;

export const SiweButton = styled(motion.button)`
  z-index: 3;
  position: absolute;
  inset: 0;
  width: 100%; // FireFox fix
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  color: var(--ck-body-action-color);
  background: var(--ck-body-background);
  transition: background-color 200ms ease, transform 100ms ease;
  /* will-change: transform; */
  svg {
    display: block;
    position: relative;
  }

  &:enabled {
    cursor: pointer;
    &:hover {
      background: var(--ck-body-background-secondary);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`;

export const BackButton = styled(motion.button)`
  z-index: 3;
  position: absolute;
  inset: 0;
  width: 100%; // FireFox fix
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  color: var(--ck-body-action-color);
  background: var(--ck-body-background);
  transition: background-color 200ms ease, transform 100ms ease;
  /* will-change: transform; */
  svg {
    display: block;
    position: relative;
    left: -1px;
  }

  &:enabled {
    cursor: pointer;
    &:hover {
      background: var(--ck-body-background-secondary);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`;

export const InfoButton = styled(motion.button)`
  z-index: 3;
  position: absolute;
  inset: 0;
  width: 100%; // FireFox fix
  transform: translateX(-1px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  color: var(--ck-body-action-color);
  background: var(--ck-body-background);
  transition: background-color 200ms ease, transform 100ms ease;
  /* will-change: transform; */
  svg {
    display: block;
    position: relative;
  }
  &:enabled {
    cursor: pointer;
    &:hover {
      background: var(--ck-body-background-secondary);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`;

export const Container = styled(motion.div)`
  --ease: cubic-bezier(0.25, 0.1, 0.25, 1);
  --duration: 200ms;
  --transition: height var(--duration) var(--ease),
    width var(--duration) var(--ease);
  z-index: 3;
  display: block;
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
  @media only screen and (max-width: ${defaultTheme.mobileWidth}px) {
    pointer-events: auto;
    left: 0;
    top: auto;
    bottom: -5px;
    transform: none;
    ${BoxContainer} {
      max-width: 448px;
      margin: 0 auto;
      &:before {
        width: 100%;
        border-radius: var(--ck-border-radius, 30px)
          var(--ck-border-radius, 30px) 0 0;
      }
    }
    ${PageContainer} {
      left: 0;
      right: 0;
      margin: 0 auto;
      width: auto;
    }
    ${PageContent} {
      margin: 0 auto;
      width: 100% !important;
    }
    ${ModalHeading} {
      top: 29px;
    }
    ${ModalContent} {
      gap: 12px;
    }
    ${ModalBody} {
      margin: 0 auto;
      max-width: 295px;
    }
    ${PageContents} {
      width: 100%;
      padding: 31px 24px;
    }
    ${ControllerContainer} {
      width: 100%;
      top: 4px;
      border-bottom: 0;
    }
    ${CloseButton} {
      right: 22px;
    }
    ${BackButton} {
      top: -1px;
      left: -3px;
    }
    ${InfoButton} {
      top: -1px;
      left: -3px;
      svg {
        width: 65%;
        height: auto;
      }
    }
    ${CloseButton},
    ${BackButton},
    ${InfoButton} {
      // Quick hack for bigger tappable area on mobile
      transform: scale(1.4) !important;
      background: transparent !important;
      svg {
        transform: scale(0.8) !important;
      }
    }
  }
`;

export const Disclaimer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px -24px -24px -24px;
  padding: 15px 40px 18px;
  font-size: var(--ck-body-disclaimer-font-size, 13px);
  font-weight: var(--ck-body-disclaimer-font-weight, 400);
  text-align: center;
  line-height: 19px;
  color: var(--ck-body-disclaimer-color, var(--ck-body-color-muted, inherit));

  & a {
    color: var(--ck-body-disclaimer-link-color, inherit);
    font-weight: var(--ck-body-disclaimer-font-weight, 400);
    text-decoration: none;
    transition: color 200ms ease;
    &:hover {
      color: var(--ck-body-disclaimer-link-hover-color, inherit);
    }
  }

  @media only screen and (max-width: ${defaultTheme.mobileWidth}px) {
    margin: 24px -24px -26px -24px;
    padding: 20px 42px 22px 42px;
  }
`;

export const DisclaimerBackground = styled(motion.div)`
  pointer-events: all;
  z-index: 9;
  position: absolute;
  bottom: 0;
  left: 50%;
  width: var(--width);
  backface-visibility: hidden;
  transform: translateX(-50%);
  transform-origin: bottom center;

  border-radius: var(--ck-border-radius, 30px);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  transition: width 200ms ease;

  background: var(
    --ck-body-disclaimer-background,
    var(--ck-body-background-secondary)
  );
  box-shadow: var(--ck-body-disclaimer-box-shadow);

  ${Disclaimer} {
    margin: 0 !important;
    /* visibility: hidden; */
  }

  @media only screen and (max-width: ${defaultTheme.mobileWidth}px) {
    border-radius: 0;
  }
`;

export const SignInTooltip = styled(motion.div)`
  z-index: 2;
  position: absolute;
  top: 100%;
  white-space: nowrap;
  padding: 8px 16px;
  color: #fff;
  font-size: 13px;
  line-height: 1.5;
  background: #1a88f8;
  border-radius: calc(var(--ck-border-radius) * 0.75);
  transform: translateY(8px) translateX(-48px);
  box-shadow: var(--ck-modal-box-shadow);
  &:before {
    content: '';
    position: absolute;
    box-shadow: var(--shadow);
    width: 18px;
    height: 18px;
    transform: translate(215%, -75%) rotate(45deg);
    background: inherit;
    border-radius: 3px 0 0 0;
  }

  @media only screen and (max-width: ${defaultTheme.mobileWidth}px) {
    transform: translateY(8px) translateX(-16px);
    &:before {
      transform: translate(40%, -75%) rotate(45deg);
    }
  }
`;
