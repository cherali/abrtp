import { articlesUrl, tagsUrl } from 'constants/urls'
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

interface TagsResult {
	tags: Array<string>
}

interface CreateArticleResult {
	article: Article
}

export interface CreateArticleParams {
	title: string
	description: string
	body: string
	tagList: Array<string>
}

interface EditArticleResult {
	article: Article
}

export interface EditArticleParams {
	title: string
	description: string
	body: string
	tagList: Array<string>
	slug: string
}

interface GetAnArticleResult {
	article: Article
}

export interface GetAnArticleParams {
	slug: string
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
		}),

		getTagList: build.query<Array<string>, unknown>({
			query: () => ({
				url: tagsUrl,
				method: 'GET'
			}),
			transformResponse(response: TagsResult) {
				return response.tags
			}
		}),

		createArtile: build.mutation<CreateArticleResult, CreateArticleParams>({
			query: article => ({
				url: articlesUrl,
				method: 'POST',
				useAuth: true,
				data: {
					article
				}
			})
		}),

		getAnArtile: build.query<Article, GetAnArticleParams>({
			query: ({ slug }) => ({
				url: `${articlesUrl}/${slug}`,
				method: 'GET'
			}),
			keepUnusedDataFor: 0,
			transformResponse(response: GetAnArticleResult) {
				return response.article
			}
		}),

		editArtile: build.mutation<EditArticleResult, EditArticleParams>({
			query: ({ slug, ...article }) => ({
				url: `${articlesUrl}/${slug}`,
				method: 'PUT',
				useAuth: true,
				data: {
					article
				}
			})
		})
	})
})

export const {
	useGetArticlesListQuery,
	useLazyGetArticlesListQuery,
	useGetTagListQuery,
	useCreateArtileMutation,
	useGetAnArtileQuery,
	useEditArtileMutation
} = articlesApi
