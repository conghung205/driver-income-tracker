export interface UserMe {
    id: string;
    phoneNumber: string;
    fullName: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
}

export interface UserMeResponse {
    data: UserMe;
}
