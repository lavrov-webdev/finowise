// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type OptionsLegacyParser } from '@hey-api/client-axios';
import type { AuthControllerSignInData, AuthControllerSignInError, AuthControllerSignInResponse, AuthControllerSignUpData, AuthControllerSignUpError, AuthControllerSignUpResponse, AuthControllerLogoutError, AuthControllerLogoutResponse, UsersControllerGetMeError, UsersControllerGetMeResponse, UsersControllerUpdatePasswordData, UsersControllerUpdatePasswordError, UsersControllerUpdatePasswordResponse, UsersControllerUpdateEmailData, UsersControllerUpdateEmailError, UsersControllerUpdateEmailResponse, UsersControllerRemoveError, UsersControllerRemoveResponse, CategoriesControllerCreateData, CategoriesControllerCreateError, CategoriesControllerCreateResponse, CategoriesControllerFindAllError, CategoriesControllerFindAllResponse, CategoriesControllerUpdateData, CategoriesControllerUpdateError, CategoriesControllerUpdateResponse, CategoriesControllerFindOneData, CategoriesControllerFindOneError, CategoriesControllerFindOneResponse, CategoriesControllerRemoveData, CategoriesControllerRemoveError, CategoriesControllerRemoveResponse, SprintsControllerCreateData, SprintsControllerCreateError, SprintsControllerCreateResponse, SprintsControllerFindAllError, SprintsControllerFindAllResponse, SprintsControllerFindCurrentError, SprintsControllerFindCurrentResponse, SprintsControllerFindOneData, SprintsControllerFindOneError, SprintsControllerFindOneResponse, SprintsControllerUpdateData, SprintsControllerUpdateError, SprintsControllerUpdateResponse, SprintsControllerRemoveData, SprintsControllerRemoveError, SprintsControllerRemoveResponse, EnvelopesControllerUpdateData, EnvelopesControllerUpdateError, EnvelopesControllerUpdateResponse, EnvelopesControllerGetByDateData, EnvelopesControllerGetByDateError, EnvelopesControllerGetByDateResponse, TransactionsControllerCreateData, TransactionsControllerCreateError, TransactionsControllerCreateResponse, TransactionsControllerSearchData, TransactionsControllerSearchError, TransactionsControllerSearchResponse, TransactionsControllerUpdateData, TransactionsControllerUpdateError, TransactionsControllerUpdateResponse, TransactionsControllerRemoveData, TransactionsControllerRemoveError, TransactionsControllerRemoveResponse } from './types.gen';

export const client = createClient(createConfig());

export const authControllerSignIn = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<AuthControllerSignInData, ThrowOnError>) => {
    return (options?.client ?? client).post<AuthControllerSignInResponse, AuthControllerSignInError, ThrowOnError>({
        ...options,
        url: '/auth/login'
    });
};

export const authControllerSignUp = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<AuthControllerSignUpData, ThrowOnError>) => {
    return (options?.client ?? client).post<AuthControllerSignUpResponse, AuthControllerSignUpError, ThrowOnError>({
        ...options,
        url: '/auth/create'
    });
};

export const authControllerLogout = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).post<AuthControllerLogoutResponse, AuthControllerLogoutError, ThrowOnError>({
        ...options,
        url: '/auth/logout'
    });
};

export const usersControllerGetMe = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<UsersControllerGetMeResponse, UsersControllerGetMeError, ThrowOnError>({
        ...options,
        url: '/users/me'
    });
};

export const usersControllerUpdatePassword = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UsersControllerUpdatePasswordData, ThrowOnError>) => {
    return (options?.client ?? client).patch<UsersControllerUpdatePasswordResponse, UsersControllerUpdatePasswordError, ThrowOnError>({
        ...options,
        url: '/users/password'
    });
};

export const usersControllerUpdateEmail = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UsersControllerUpdateEmailData, ThrowOnError>) => {
    return (options?.client ?? client).patch<UsersControllerUpdateEmailResponse, UsersControllerUpdateEmailError, ThrowOnError>({
        ...options,
        url: '/users/email'
    });
};

export const usersControllerRemove = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).delete<UsersControllerRemoveResponse, UsersControllerRemoveError, ThrowOnError>({
        ...options,
        url: '/users'
    });
};

export const categoriesControllerCreate = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CategoriesControllerCreateData, ThrowOnError>) => {
    return (options?.client ?? client).post<CategoriesControllerCreateResponse, CategoriesControllerCreateError, ThrowOnError>({
        ...options,
        url: '/categories'
    });
};

export const categoriesControllerFindAll = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<CategoriesControllerFindAllResponse, CategoriesControllerFindAllError, ThrowOnError>({
        ...options,
        url: '/categories'
    });
};

export const categoriesControllerUpdate = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CategoriesControllerUpdateData, ThrowOnError>) => {
    return (options?.client ?? client).patch<CategoriesControllerUpdateResponse, CategoriesControllerUpdateError, ThrowOnError>({
        ...options,
        url: '/categories'
    });
};

export const categoriesControllerFindOne = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CategoriesControllerFindOneData, ThrowOnError>) => {
    return (options?.client ?? client).get<CategoriesControllerFindOneResponse, CategoriesControllerFindOneError, ThrowOnError>({
        ...options,
        url: '/categories/{id}'
    });
};

export const categoriesControllerRemove = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CategoriesControllerRemoveData, ThrowOnError>) => {
    return (options?.client ?? client).delete<CategoriesControllerRemoveResponse, CategoriesControllerRemoveError, ThrowOnError>({
        ...options,
        url: '/categories/{id}'
    });
};

export const sprintsControllerCreate = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<SprintsControllerCreateData, ThrowOnError>) => {
    return (options?.client ?? client).post<SprintsControllerCreateResponse, SprintsControllerCreateError, ThrowOnError>({
        ...options,
        url: '/sprints'
    });
};

export const sprintsControllerFindAll = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<SprintsControllerFindAllResponse, SprintsControllerFindAllError, ThrowOnError>({
        ...options,
        url: '/sprints'
    });
};

export const sprintsControllerFindCurrent = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<SprintsControllerFindCurrentResponse, SprintsControllerFindCurrentError, ThrowOnError>({
        ...options,
        url: '/sprints/current'
    });
};

export const sprintsControllerFindOne = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<SprintsControllerFindOneData, ThrowOnError>) => {
    return (options?.client ?? client).get<SprintsControllerFindOneResponse, SprintsControllerFindOneError, ThrowOnError>({
        ...options,
        url: '/sprints/{id}'
    });
};

export const sprintsControllerUpdate = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<SprintsControllerUpdateData, ThrowOnError>) => {
    return (options?.client ?? client).patch<SprintsControllerUpdateResponse, SprintsControllerUpdateError, ThrowOnError>({
        ...options,
        url: '/sprints/{id}'
    });
};

export const sprintsControllerRemove = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<SprintsControllerRemoveData, ThrowOnError>) => {
    return (options?.client ?? client).delete<SprintsControllerRemoveResponse, SprintsControllerRemoveError, ThrowOnError>({
        ...options,
        url: '/sprints/{id}'
    });
};

export const envelopesControllerUpdate = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<EnvelopesControllerUpdateData, ThrowOnError>) => {
    return (options?.client ?? client).patch<EnvelopesControllerUpdateResponse, EnvelopesControllerUpdateError, ThrowOnError>({
        ...options,
        url: '/envelopes/{id}'
    });
};

export const envelopesControllerGetByDate = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<EnvelopesControllerGetByDateData, ThrowOnError>) => {
    return (options?.client ?? client).get<EnvelopesControllerGetByDateResponse, EnvelopesControllerGetByDateError, ThrowOnError>({
        ...options,
        url: '/envelopes/by_date/{date}'
    });
};

export const transactionsControllerCreate = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<TransactionsControllerCreateData, ThrowOnError>) => {
    return (options?.client ?? client).post<TransactionsControllerCreateResponse, TransactionsControllerCreateError, ThrowOnError>({
        ...options,
        url: '/transactions'
    });
};

export const transactionsControllerSearch = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<TransactionsControllerSearchData, ThrowOnError>) => {
    return (options?.client ?? client).get<TransactionsControllerSearchResponse, TransactionsControllerSearchError, ThrowOnError>({
        ...options,
        url: '/transactions'
    });
};

export const transactionsControllerUpdate = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<TransactionsControllerUpdateData, ThrowOnError>) => {
    return (options?.client ?? client).patch<TransactionsControllerUpdateResponse, TransactionsControllerUpdateError, ThrowOnError>({
        ...options,
        url: '/transactions/{id}'
    });
};

export const transactionsControllerRemove = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<TransactionsControllerRemoveData, ThrowOnError>) => {
    return (options?.client ?? client).delete<TransactionsControllerRemoveResponse, TransactionsControllerRemoveError, ThrowOnError>({
        ...options,
        url: '/transactions/{id}'
    });
};