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

export interface GoalData {
    dailyGoal: number;
    todayIncome: number;
    progressPercentage: number;
}

export interface GoalResponse {
    data: GoalData;
}
export interface UpdateGoal {
    dailyGoal: number | null;
}

export interface UpdateUser {
    fullName?: string;
    phoneNumber?: string;
}
export interface UpdatePassword {
    currentPassword: string;
    newPassword: string;
}
export interface UpdatePasswordFormInput extends UpdatePassword {
    confirmPassword: string;
}
