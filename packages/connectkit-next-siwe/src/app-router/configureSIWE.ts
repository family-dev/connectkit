import { IronSessionOptions } from 'iron-session';
import { NextRequest, NextResponse } from 'next/server';
import { generateNonce, SiweErrorType, SiweMessage } from 'siwe';
import { Address } from 'viem';
import Session, { type Cookies } from './session';

type RouteHandlerOptions = {
  afterNonce?: (req: NextRequest, session: NextSIWESession<{}>) => Promise<void>;
  afterVerify?: (req: NextRequest, session: NextSIWESession<{}>) => Promise<void>;
  afterSession?: (req: NextRequest, session: NextSIWESession<{}>) => Promise<void>;
  afterLogout?: (req: NextRequest) => Promise<void>;
};
type NextServerSIWEConfig = {
  session?: Partial<IronSessionOptions>;
  options?: RouteHandlerOptions;
};

type NextSIWESession<TSessionData extends Object = {}> = Session & TSessionData;

type NextRouteHandler = (req: NextRequest, { params }: { params: any }) => Promise<Response>
type ConfigureServerSIWEResult<TSessionData extends Object = {}> = {
  apiRouteHandler: {
    GET: NextRouteHandler;
    POST: NextRouteHandler;
  };
  getSession: (cookies: Cookies) => Promise<NextSIWESession<TSessionData>>;
};

const getSession = async <TSessionData extends Object = {}>(
  cookies: Cookies,
  sessionConfig: IronSessionOptions
) => {
  const session = await Session.fromCookies(cookies, sessionConfig);
  return session as NextSIWESession<TSessionData>;
};

const logoutRoute = async (
  req: NextRequest,
  sessionConfig: IronSessionOptions,
  afterCallback?: RouteHandlerOptions['afterLogout']
): Promise<NextResponse<void>> => {
  const session = await getSession(req.cookies, sessionConfig);
  const res = new NextResponse<void>();
  await session.destroy(res, sessionConfig);
  if (afterCallback) {
    await afterCallback(req);
  }
  return res;
};

const nonceRoute = async (
  req: NextRequest,
  sessionConfig: IronSessionOptions,
  afterCallback?: RouteHandlerOptions['afterNonce']
): Promise<NextResponse<string>> => {
  const session = await getSession(req.cookies, sessionConfig);
  let res: NextResponse<string> = new NextResponse<string>(session.nonce);
  if (!session.nonce) {
    session.nonce = generateNonce();
    res = new NextResponse<string>(session.nonce);
    await session.save(res, sessionConfig);
  }
  if (afterCallback) {
    await afterCallback(req, session);
  }
  return res;
};

const sessionRoute = async (
  req: NextRequest,
  sessionConfig: IronSessionOptions,
  afterCallback?: RouteHandlerOptions['afterSession']
): Promise<NextResponse<{ address?: string; chainId?: number }>> => {
  const session = await getSession(req.cookies, sessionConfig);
  if (afterCallback) {
    await afterCallback(req, session);
  }
  const { address, chainId } = session;
  return NextResponse.json({ address, chainId });
};

const verifyRoute = async (
  req: NextRequest,
  sessionConfig: IronSessionOptions,
  afterCallback?: RouteHandlerOptions['afterVerify']
): Promise<NextResponse<void>> => {
  try {
    const session = await getSession(req.cookies, sessionConfig);
    const { message, signature } = await req.json();
    const siweMessage = new SiweMessage(message);
    const { data: fields } = await siweMessage.verify({ signature, nonce: session.nonce });
    if (fields.nonce !== session.nonce) {
      return new NextResponse('Invalid nonce.', { status: 422 });
    }
    session.address = fields.address as Address;
    session.chainId = fields.chainId;
    const res = new NextResponse<void>()
    await session.save(res, sessionConfig);
    if (afterCallback) {
      await afterCallback(req, session);
    }
    return res;
  } catch (error) {
    switch (error) {
      case SiweErrorType.INVALID_NONCE:
      case SiweErrorType.INVALID_SIGNATURE: {
        return new NextResponse(String(error), { status: 422 });
      }
      default: {
        return new NextResponse(String(error), { status: 400 });
      }
    }
  }
};

const envVar = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

export const configureServerSideSIWE = <TSessionData extends Object = {}>({
  session: { cookieName, password, cookieOptions, ...otherSessionOptions } = {},
  options: { afterNonce, afterVerify, afterSession, afterLogout } = {},
}: NextServerSIWEConfig): ConfigureServerSIWEResult<TSessionData> => {
  const sessionConfig: IronSessionOptions = {
    cookieName: cookieName ?? 'connectkit-next-siwe',
    password: password ?? envVar('SESSION_SECRET'),
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      ...(cookieOptions ?? {}),
    },
    ...otherSessionOptions,
  };

  function checkRouteParam(params: any): asserts params is { route: string[] } {
    if (!(params.route instanceof Array)) {
      throw new Error(
        'Catch-all query param `route` not found. SIWE API page should be named `[...route]/route.ts` and within your `app/api` directory.'
      );
    }
  }

  const GET: NextRouteHandler = async (req: NextRequest, { params }: { params: any }) => {
    checkRouteParam(params);

    const route = params.route.join('/');
    switch (route) {
      case 'nonce':
        return await nonceRoute(req, sessionConfig, afterNonce);
      case 'session':
        return await sessionRoute(req, sessionConfig, afterSession);
      case 'logout':
        return await logoutRoute(req, sessionConfig, afterLogout);
      default:
        return new Response(null, { status: 404 });
    }
  }

  const POST: NextRouteHandler = async (req: NextRequest, { params }: { params: any }) => {
    checkRouteParam(params);

    const route = params.route.join('/');
    switch (route) {
      case 'verify':
        return await verifyRoute(req, sessionConfig, afterVerify);
      default:
        return new Response(null, { status: 404 });
    }
  }

  return {
    apiRouteHandler: {
      GET,
      POST,
    },
    getSession: async (cookies: Cookies) =>
      await getSession<TSessionData>(cookies, sessionConfig),
  };
};
