export type LLMRequestData = {
    document?: FileList;
    query_text?: string;
    similarity_threshold: number;
    citation_strategy?: string | undefined;
    reference_sources: string[];
};

export type ReferenceUploadData = {
    files: FileList;
    model_name: string;
};
