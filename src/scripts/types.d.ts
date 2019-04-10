type HTTPMethods = 'get' | 'delete' | 'post' | 'put'
type URLParamsObj = { [key: string]: string | number | boolean }

interface TwitterUser {
  id_str: string
  screen_name: string
  name: string
  blocked_by?: boolean
  blocking?: boolean
  muting?: boolean
  followed_by?: boolean
  following?: boolean
  follow_request_sent?: boolean
  friends_count: number
  followers_count: number
  protected?: boolean
  verified?: boolean
  created_at: string // datetime example: 'Sun Jun 29 05:52:09 +0000 2014'
  description: string
}

interface TwitterUserEntities {
  [userId: string]: TwitterUser
}

interface FollowsListResponse {
  next_cursor_str: string
  users: TwitterUser[]
}

interface FollowsIdsResponse {
  next_cursor_str: string
  ids: string[]
}

interface FollowsScraperOptions {
  delay: number
}

interface Limit {
  limit: number
  remaining: number
  reset: number
}

interface LimitStatus {
  application: {
    '/application/rate_limit_status': Limit
  }
  auth: {
    '/auth/csrf_token': Limit
  }
  blocks: {
    '/blocks/list': Limit
    '/blocks/ids': Limit
  }
  followers: {
    '/followers/ids': Limit
    '/followers/list': Limit
  }
  friends: {
    '/friends/following/ids': Limit
    '/friends/following/list': Limit
    '/friends/list': Limit
    '/friends/ids': Limit
  }
}

interface FollowsScraperOptions {
  delay: number
}

type RateLimited<T> = T | 'RateLimitError'

interface EventStore {
  [eventName: string]: Function[]
}

interface MBStartChainBlockMessage {
  action: Action.StartChainBlock
  userName: string
  followType: FollowType
}

interface MBStopChainBlockMessage {
  action: Action.StopChainBlock
}

type MBMessage = MBStartChainBlockMessage | MBStopChainBlockMessage

type UserState = 'shouldBlock' | 'alreadyBlocked' | 'muteSkip'

type BlockResult = 'notYet' | 'pending' | 'blockSuccess' | 'blockFailed'

type BlockResultsMap = Map<TwitterUser, BlockResult>

interface FoundUser {
  user: TwitterUser
  state: UserState
}

interface ChainMirrorBlockProgress {
  scraped: number
  foundUsers: FoundUser[]
}

interface MirrorBlockOption {
  outlineBlockUser: boolean
  enableBlockReflection: boolean
  blockMutedUser: boolean
  alwaysImmediatelyBlockMode: boolean
  noDelay: boolean
}

declare function cloneInto<T>(detail: T, view: Window | null): T

// r.i.c
// copied from https://github.com/Microsoft/TypeScript/issues/21309#issuecomment-376338415
type RequestIdleCallbackHandle = any
type RequestIdleCallbackOptions = {
  timeout: number
}
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean
  timeRemaining: () => number
}

declare function requestIdleCallback(
  callback: (deadline: RequestIdleCallbackDeadline) => void,
  opts?: RequestIdleCallbackOptions
): RequestIdleCallbackHandle
declare function cancelIdleCallback(handle: RequestIdleCallbackHandle): void
// .end

declare namespace uuid {
  function v1(): string
}
