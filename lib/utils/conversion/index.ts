import {
  getQuoteFromBase,
  fp32Mul,
  splToUiAmount,
  splToUiAmountFixed,
  uiToSplAmount,
  uiToSplAmountFixed,
  uiToSplPrice,
  splToUiPrice,
} from '@chugach-foundation/cypher-client'
import { BN } from '@project-serum/anchor'
import { I80F48 } from '@blockworks-foundation/mango-client'

/* -------------------------------------------------------------------------- */

export const fixDecimalNumber = (number: number) =>
  Math.round(number * 100_000) / 100_000

/* -------------------------------------------------------------------------- */

export function fp32MulSafe(a: BN, bFp32: BN): BN {
  try {
    return fp32Mul(a, bFp32)
  } catch (e) {
    console.error('Could not convert', e)
    return new BN(0)
  }
}

/* -------------------------------------------------------------------------- */

export function getQuoteFromBaseSafe(
  baseAmount: BN,
  scaledPriceFp32: BN,
  baseMultiplier: BN,
  quoteMultiplier: BN,
): BN {
  try {
    return getQuoteFromBase(
      baseAmount,
      scaledPriceFp32,
      baseMultiplier,
      quoteMultiplier,
    )
  } catch (e) {
    console.error('Could not convert', e)
    return new BN(0)
  }
}

/* -------------------------------------------------------------------------- */

export function splToUiAmountSafe(splAmount: BN, decimals: number) {
  try {
    return splToUiAmount(splAmount, decimals)
  } catch (e) {
    console.error('Could not convert', e)
    return 0
  }
}

/* -------------------------------------------------------------------------- */

export function splToUiAmountFixedSafe(
  splAmount: I80F48,
  decimals: number,
): I80F48 {
  try {
    return splToUiAmountFixed(splAmount, decimals)
  } catch (e) {
    console.error('Could not convert', e)
    return I80F48.fromNumber(0)
  }
}

/* -------------------------------------------------------------------------- */

export function splToUiPriceSafe(
  splPrice: BN,
  baseDecimals: number,
  quoteDecimals: number,
): number {
  try {
    return splToUiPrice(splPrice, baseDecimals, quoteDecimals)
  } catch (e) {
    console.error('Could not convert', e)
    return 0
  }
}

/* -------------------------------------------------------------------------- */

export function uiToSplAmountSafe(uiAmount: number, decimals: number): BN {
  try {
    return uiToSplAmount(uiAmount, decimals)
  } catch (e) {
    console.error('Could not convert', e)
    return new BN(0)
  }
}

export function uiToSplAmountFixedSafe(
  uiAmount: number,
  decimals: number,
): I80F48 {
  try {
    return uiToSplAmountFixed(uiAmount, decimals)
  } catch (e) {
    console.error('Could not convert', e)
    return I80F48.fromNumber(0)
  }
}

/* -------------------------------------------------------------------------- */

export function uiToSplPriceSafe(
  uiPrice: number,
  baseDecimals: number,
  quoteDecimals: number,
): BN {
  try {
    return uiToSplPrice(uiPrice, baseDecimals, quoteDecimals)
  } catch (e) {
    console.error('Could not convert', e)
    return new BN(0)
  }
}

/* -------------------------------------------------------------------------- */

export const getI80F48NumberFromSpl = (
  value: I80F48,
  decimals: number,
): number => {
  try {
    return Number(splToUiAmountFixed(value, decimals).toFixed(5))
  } catch (e) {
    console.error('Could not convert', e)
    return 0
  }
}

/* -------------------------------------------------------------------------- */

export const getI80F48Number = (value: I80F48): number => {
  try {
    return Number(value.toFixed(5))
  } catch (e) {
    console.error('Could not convert', e)
    return 0
  }
}

/* -------------------------------------------------------------------------- */

export const getSplToUiAmountOrInf = (
  splAmount: BN,
  decimals: number,
): number => {
  try {
    return splToUiAmount(splAmount, decimals)
  } catch (e) {
    return Infinity
  }
}
