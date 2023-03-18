import { promisify } from 'util'

/* -------------------------------------------------------------------------- */

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/* -------------------------------------------------------------------------- */

export const makeMethodAsync = <T extends unknown>(
  redis: T,
  methodName: string,
) => promisify(redis[methodName]).bind(redis)

/* -------------------------------------------------------------------------- */

export type CreateMapType = (
  arr: any,
  idBy: string | Function,
  valueBy?: Function,
) => { [key: string]: any }

export const createMap: CreateMapType = (arr, idBy, valueBy) => {
  const map = {}
  for (const item of arr) {
    const id = typeof idBy === 'string' ? idBy : idBy(item)
    const value = typeof valueBy === 'function' ? valueBy(item) : item
    map[id] = value
  }

  return map
}

/* -------------------------------------------------------------------------- */

export const repeatWhenFailed = <T extends unknown, Y extends unknown>(
  call: (x: Y) => Promise<T>,
  timeout: number,
  fnName = 'Unknown asycn function call',
) => {
  return async (x: Y) => {
    try {
      return await call(x)
    } catch (err) {
      console.log(`${fnName} call failed! repeating in ${timeout} ms...`)
      console.error(err)
      await sleep(timeout)
      const repeater: (x: Y) => Promise<T> = repeatWhenFailed(
        call,
        timeout,
        fnName,
      )
      return await repeater(x)
    }
  }
}

/* -------------------------------------------------------------------------- */

export const getJsonString = (obj: unknown) => JSON.stringify(obj, null, 2)

/* -------------------------------------------------------------------------- */

export const onProcessEnd = (fn: () => void) => {
  const exitFn = () => {
    fn()
    process.exit()
  }
  process.on('exit', exitFn)
  process.on('SIGINT', exitFn)
  process.on('SIGUSR1', exitFn)
  process.on('SIGUSR2', exitFn)
  process.on('uncaughtException', exitFn)
}

/* -------------------------------------------------------------------------- */

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export function removeGivenValues<
  T extends Record<string, unknown>,
  D extends unknown,
>(obj: T, check: D): DeepPartial<T> {
  const newObj = {} as Record<string, unknown>

  for (const key of Object.keys(obj)) {
    const value = obj[key]
    if (value !== check) newObj[key as string] = value
  }

  return newObj as DeepPartial<T>
}
