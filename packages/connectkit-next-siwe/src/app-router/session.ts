/**
 * iron-session has not been updated for the Next.js 13 App Router yet. This
 * class is a shim for the `getIronSession(req, res, options)` function that
 * iron-session provides. It uses the lower-level `sealData` and `unsealData`
 * APIs and interacts with the request cookies directly.
 *
 * Adapted from https://github.com/m1guelpf/nextjs13-connectkit-siwe
 */

import { sealData, unsealData, type IronSessionOptions } from 'iron-session'
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { NextResponse } from 'next/server'
import { Address } from 'viem'

export type Cookies = RequestCookies | ReadonlyRequestCookies;

export type SerializedSession = {
  nonce?: string
  chainId?: number
  address?: Address
}

export default class Session {
  nonce?: string
  chainId?: number
  address?: Address

  constructor(session?: SerializedSession) {
    this.nonce = session?.nonce
    this.chainId = session?.chainId
    this.address = session?.address
  }

  static async fromCookies(
    cookies: RequestCookies | ReadonlyRequestCookies,
    config: IronSessionOptions
  ): Promise<Session> {
    const sessionCookie = cookies.get(config.cookieName)?.value;

    if (!sessionCookie) return new Session();
    return new Session(await unsealData<SerializedSession>(sessionCookie, config));
  }

  async destroy(res: NextResponse, config: IronSessionOptions) {
    this.nonce = undefined;
    this.chainId = undefined;
    this.address = undefined;

    return this.save(res, config)
  }

  async save(res: NextResponse, config: IronSessionOptions) {
    const data = await sealData(this.toJSON(), config);

    // TODO: iron-session manages some default options for these cookies
    // Some of these make development much easier, like setting `max-age` based
    // on the `ttl`, and defaulting that to 14 days rather than expiring after
    // the session ends
    // https://github.com/vvo/iron-session/blob/bf7b808707a436a14b9fa4d1f224f9490591a638/src/core.ts#L97
    res.cookies.set(config.cookieName, data, config.cookieOptions);
  }

  toJSON(): SerializedSession {
    return { nonce: this.nonce, address: this.address, chainId: this.chainId };
  }
}
