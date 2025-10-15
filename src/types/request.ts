export type LoginProps = {
    email: string;
    password: string;
};

export type RegisterProps = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type LLMRequestData = {
    document?: FileList;
    paragraph?: string;
    similarityThreshold: number;
    citationStrategy: string;
    selectedReferences: string[];
};
