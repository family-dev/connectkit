import { css } from 'styled-components';
import styled from '../../../styles/styled';

export const ScrollAreaContainer = styled.div<{
  $mobile?: boolean;
  $height?: number;
  $backgroundColor?: string;
}>`
  --bg: ${({ $backgroundColor }) =>
    $backgroundColor || 'var(--ck-body-background)'};
  --fade-height: 1px;
  position: relative;
  z-index: 1;

  ${({ $mobile, $height }) =>
    $mobile
      ? css`
          overflow-x: scroll;
          margin: 0 -24px;
          padding: 0 24px;

          &:before,
          &:after {
            pointer-events: none;
            z-index: 2;
            content: '';
            display: block;
            position: sticky;
            top: 0;
            bottom: 0;
            width: var(--fade-height);
            background: var(--ck-body-divider);
            box-shadow: var(--ck-body-divider-box-shadow);
            transition: opacity 300ms ease;
          }
          &:before {
            left: 0;
          }
          &:after {
            right: 0;
          }

          &.scroll-start {
            &:before {
              opacity: 0;
            }
          }

          &.scroll-end {
            &:after {
              opacity: 0;
            }
          }
        `
      : css`
          max-height: ${$height ? `${$height}px` : '310px'};
          overflow-y: scroll;
          padding: 0 10px;
          margin: calc(var(--fade-height) * -1) -16px 0 -10px;

          &:before,
          &:after {
            pointer-events: none;
            z-index: 2;
            content: '';
            display: block;
            position: sticky;
            left: 0;
            right: 0;
            height: var(--fade-height);
            background: var(--ck-body-divider);
            box-shadow: var(--ck-body-divider-box-shadow);
            transition: opacity 300ms ease;
          }
          &:before {
            top: 0;
          }
          &:after {
            bottom: 0;
          }

          &.scroll-start {
            &:before {
              opacity: 0;
            }
          }

          &.scroll-end {
            &:after {
              opacity: 0;
            }
          }
        `}

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0);
    border-radius: 100px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background: var(--ck-body-color-muted);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--ck-body-color-muted-hover);
  }
`;