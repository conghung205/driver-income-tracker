export interface LoginPayload {
    phoneNumber: string;
    password: string;
}

export interface RegisterPayload {
    phoneNumber: string;
    fullName: string;
    password: string;
}
export interface RegisterFormInput extends RegisterPayload {
    confirmPassword: string;
}

export interface UserResponse {
    id: string;
    phoneNumber: string;
    fullName: string;
}

export interface AuthResponse {
    message: string;
    data: {
        user: UserResponse;
    };
}
export interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
}
