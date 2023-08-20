export interface State {
    list: Post[];
    status: Status;
}

export interface Status {
    pending: boolean;
    error: null | string;
}

export interface Post {
    id: number;
    body: string;
}