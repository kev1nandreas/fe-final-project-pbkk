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

export function typecastReferencesResponse(
  data: unknown
): ReferencesResponse[] | undefined {
  return data as ReferencesResponse[] | undefined;
}

export function typecastModelsResponse(
  data: unknown
): ModelsResponse | undefined {
  return data as ModelsResponse | undefined;
}

export function typecastHistoryByIdResponse(
  data: unknown
): HistoryResponse | undefined {
  return data as HistoryResponse | undefined;
}

export function typecastHistoryResponse(
  data: unknown
): HistoryResponse[] | undefined {
  return data as HistoryResponse[] | undefined;
}
