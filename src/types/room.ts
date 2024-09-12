export interface TRoom {
    _id?: string;
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string[];
    images: string[];
    isDeleted: boolean;
}
