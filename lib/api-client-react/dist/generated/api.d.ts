import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { Contribution, ContributionInput, GetRandomPuzzleParams, HealthStatus, Language, Puzzle, PuzzleDetail } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListLanguagesUrl: () => string;
/**
 * Returns all supported Philippine regional languages
 * @summary List available languages
 */
export declare const listLanguages: (options?: RequestInit) => Promise<Language[]>;
export declare const getListLanguagesQueryKey: () => readonly ["/api/languages"];
export declare const getListLanguagesQueryOptions: <TData = Awaited<ReturnType<typeof listLanguages>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLanguages>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listLanguages>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListLanguagesQueryResult = NonNullable<Awaited<ReturnType<typeof listLanguages>>>;
export type ListLanguagesQueryError = ErrorType<unknown>;
/**
 * @summary List available languages
 */
export declare function useListLanguages<TData = Awaited<ReturnType<typeof listLanguages>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLanguages>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetRandomPuzzleUrl: (params: GetRandomPuzzleParams) => string;
/**
 * Returns a random Filipino word puzzle for the given language
 * @summary Get a random word puzzle
 */
export declare const getRandomPuzzle: (params: GetRandomPuzzleParams, options?: RequestInit) => Promise<Puzzle>;
export declare const getGetRandomPuzzleQueryKey: (params?: GetRandomPuzzleParams) => readonly ["/api/puzzle", ...GetRandomPuzzleParams[]];
export declare const getGetRandomPuzzleQueryOptions: <TData = Awaited<ReturnType<typeof getRandomPuzzle>>, TError = ErrorType<void>>(params: GetRandomPuzzleParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRandomPuzzle>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getRandomPuzzle>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetRandomPuzzleQueryResult = NonNullable<Awaited<ReturnType<typeof getRandomPuzzle>>>;
export type GetRandomPuzzleQueryError = ErrorType<void>;
/**
 * @summary Get a random word puzzle
 */
export declare function useGetRandomPuzzle<TData = Awaited<ReturnType<typeof getRandomPuzzle>>, TError = ErrorType<void>>(params: GetRandomPuzzleParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRandomPuzzle>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetPuzzleByIdUrl: (id: number) => string;
/**
 * Returns a puzzle with meaning, pronunciation, and example sentence (for post-solve reveal)
 * @summary Get puzzle with full details
 */
export declare const getPuzzleById: (id: number, options?: RequestInit) => Promise<PuzzleDetail>;
export declare const getGetPuzzleByIdQueryKey: (id: number) => readonly [`/api/puzzle/${number}`];
export declare const getGetPuzzleByIdQueryOptions: <TData = Awaited<ReturnType<typeof getPuzzleById>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPuzzleById>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getPuzzleById>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetPuzzleByIdQueryResult = NonNullable<Awaited<ReturnType<typeof getPuzzleById>>>;
export type GetPuzzleByIdQueryError = ErrorType<void>;
/**
 * @summary Get puzzle with full details
 */
export declare function useGetPuzzleById<TData = Awaited<ReturnType<typeof getPuzzleById>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPuzzleById>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListContributionsUrl: () => string;
/**
 * Returns submitted word contributions
 * @summary List word contributions
 */
export declare const listContributions: (options?: RequestInit) => Promise<Contribution[]>;
export declare const getListContributionsQueryKey: () => readonly ["/api/contributions"];
export declare const getListContributionsQueryOptions: <TData = Awaited<ReturnType<typeof listContributions>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listContributions>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listContributions>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListContributionsQueryResult = NonNullable<Awaited<ReturnType<typeof listContributions>>>;
export type ListContributionsQueryError = ErrorType<unknown>;
/**
 * @summary List word contributions
 */
export declare function useListContributions<TData = Awaited<ReturnType<typeof listContributions>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listContributions>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSubmitContributionUrl: () => string;
/**
 * Submit a new word to be added to the dictionary
 * @summary Submit a new word contribution
 */
export declare const submitContribution: (contributionInput: ContributionInput, options?: RequestInit) => Promise<Contribution>;
export declare const getSubmitContributionMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitContribution>>, TError, {
        data: BodyType<ContributionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof submitContribution>>, TError, {
    data: BodyType<ContributionInput>;
}, TContext>;
export type SubmitContributionMutationResult = NonNullable<Awaited<ReturnType<typeof submitContribution>>>;
export type SubmitContributionMutationBody = BodyType<ContributionInput>;
export type SubmitContributionMutationError = ErrorType<void>;
/**
* @summary Submit a new word contribution
*/
export declare const useSubmitContribution: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitContribution>>, TError, {
        data: BodyType<ContributionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof submitContribution>>, TError, {
    data: BodyType<ContributionInput>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map