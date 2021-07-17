export interface Gift {
    id: string;
    name: string;
    items: GiftItems[];
    multiple: boolean;
    maxOpening: number;
    consumed?: number;
}

export interface GiftItems {
    id: number;
    description: string;
    name: string;
    created: Date;
    imageUrl: string;
}
