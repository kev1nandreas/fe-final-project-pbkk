export type PaginationType = {
	Total: number;
	Limit: number;
	PageCurrent: number;
	PageTotal: number;
};

export type ResponseMeta<T> = {
	Message: string;
	Results: {
		Status: boolean;
		Data: T;
		Pagination?: PaginationType;
	};
};

export interface ReferencesResponse {
	original_filename: string;
	paper_title: string;
	model_name: string;
}

export interface ModelsResponse {
	ollama: string[];
	gemini: string[];
}

export function typecastReferencesResponse(data: unknown): ReferencesResponse[] | undefined {
  return data as ReferencesResponse[] | undefined;
}

export function typecastModelsResponse(data: unknown): ModelsResponse | undefined {
  return data as ModelsResponse | undefined;
}