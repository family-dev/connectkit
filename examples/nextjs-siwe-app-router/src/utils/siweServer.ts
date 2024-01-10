import { configureServerSideSIWEAppRouter } from 'connectkit-next-siwe';

export const siweServer = configureServerSideSIWEAppRouter({
  session: {
    cookieName: 'connectkit-next-siwe',
    password: process.env.SESSION_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});
