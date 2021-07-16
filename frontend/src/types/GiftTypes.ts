export interface Gift {
    id: number;
    name: string;
    items: GiftItems[];
}

export interface GiftItems {
    id: number;
    description: string;
    name: string;
    created: Date;
    imageUrl: string;
}
