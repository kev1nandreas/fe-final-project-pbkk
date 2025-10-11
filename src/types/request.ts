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

export type LLMRequestDataDocs = {
    document: FileList;
};

export type LLMRequestDataText = {
    paragraph: string;
};
