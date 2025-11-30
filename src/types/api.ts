export type PaginateData<Data> = {
	data_per_page: Data;
	meta: {
		page: number;
		max_page: number;
	};
};

export interface PaginatedApiResponse<DataType> {
	code: number;
	status: boolean;
	message: string;
	data: PaginateData<DataType>;
}

export type ApiResponse<T> = {
	message: string;
	status: boolean;
	code: number;
	data: T;
};

export interface HistoryResponse {
  id: string;
  similarity_threshold: number;
  query_text: string;
  result_count: number;
  created_at: string;
  results: HistoryListItem[];
}

export interface HistoryListItem {
  source_paper: string;
  source_content: string;
  similarity_score: number;
  citation_suggestion: string;
}

export type ApiError = {
	code: number;
	status: boolean | number;
	message: string;
};

export type UninterceptedApiError = {
	code: number;
	status: boolean;
	message: string | Record<string, string[]>;
};
