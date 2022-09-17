import { articlesUrl } from 'constants/urls'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'utils/apiUtil'
import { convertToUrlString } from 'utils/helpers'

export interface Article {
	slug: string
	title: string
	description: string
	body: string
	tagList: Array<string>
	createdAt: string
	updatedAt: string
	favorited: boolean
	favoritesCount: number
	author: {
		username: string
		bio?: string | null
		image?: string
		following: boolean
	}
}

export interface ArticlesResult {
	articles: Array<Article>
	articlesCount: number
}

interface GetArticlesListParams {
	limit: number | string
	offset: number | string

	// future use
	// tag: string
	// author: string
	// favorited: string
}

export const articlesApi = createApi({
	reducerPath: 'articles',
	baseQuery: axiosBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
	endpoints: build => ({
		getArticlesList: build.query<ArticlesResult, GetArticlesListParams>({
			query: ({ limit, offset }) => ({
				url: `${articlesUrl}?${convertToUrlString({ limit, offset })}`,
				method: 'GET'
			})
		})
	})
})

export const { useGetArticlesListQuery, useLazyGetArticlesListQuery } = articlesApi