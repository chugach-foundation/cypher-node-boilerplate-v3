type tx = string
type ValueType<T> = T extends Promise<infer U> ? U : T

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
