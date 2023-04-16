type Success<TSuccess> = {
  isSuccess: true
  value: TSuccess
}

type Failure<TError> = {
  isSuccess: false
  error: TError
}

export type Result<TSuccess, TError> = Success<TSuccess> | Failure<TError>

export namespace Result {
  export const success = <TSuccess, TError>(
    value: TSuccess,
  ): Result<TSuccess, TError> => ({
    isSuccess: true,
    value,
  })

  export const value = <TSuccess, TError>(
    result: Result<TSuccess, TError>,
  ): TSuccess => {
    if (result.isSuccess) {
      return (result as Success<TSuccess>).value
    }

    throw new Error('Cannot get value of a failure result')
  }

  export const map = <TSuccess, TError, TNewSuccess>(
    result: Result<TSuccess, TError>,
    mapper: (value: TSuccess) => TNewSuccess,
  ): Result<TNewSuccess, TError> => {
    if (result.isSuccess) {
      return success(mapper((result as Success<TSuccess>).value))
    }

    return result as Failure<TError>
  }

  export const bind = <TSuccess, TError, TNewSuccess>(
    result: Result<TSuccess, TError>,
    mapper: (value: TSuccess) => Result<TNewSuccess, TError>,
  ): Result<TNewSuccess, TError> => {
    if (result.isSuccess) {
      return mapper((result as Success<TSuccess>).value)
    }

    return result as Failure<TError>
  }

  export const failure = <TSuccess, TError>(
    error: TError,
  ): Result<TSuccess, TError> => ({
    isSuccess: false,
    error,
  })

  export const mapError = <TSuccess, TError, TNewError>(
    result: Result<TSuccess, TError>,
    mapper: (error: TError) => TNewError,
  ): Result<TSuccess, TNewError> => {
    if (result.isSuccess) {
      return result as Success<TSuccess>
    }

    return failure(mapper((result as Failure<TError>).error))
  }

  export const error = <TSuccess, TError>(
    result: Result<TSuccess, TError>,
  ): TError => {
    if (result.isSuccess) {
      throw new Error('Cannot get error of a success result')
    }

    return (result as Failure<TError>).error
  }
}
