export interface ListData<T> {
	items: T[];
	totalCount: number;
	totalPages: number;
	hasMore: boolean;
}

export interface AIResponse<T> {
	data: T;
	success: boolean;
}
