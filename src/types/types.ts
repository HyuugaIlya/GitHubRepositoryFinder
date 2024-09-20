import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryActionCreatorResult, QueryDefinition } from "@reduxjs/toolkit/query/react";
import { TQuery, TRepositories } from "../store";


export type TGetReps = (arg: TQuery, preferCacheValue?: boolean) => QueryActionCreatorResult<QueryDefinition<TQuery, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>, never, TRepositories, "repositoriesApi">>