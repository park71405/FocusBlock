export interface LoginRequest {
    loginId: string;
    password: string;
}

export interface LoginResponse {
    grantType: string;
    accessToken: string;
    accessTokenExpiresIn: number;
    userInfo: UserProfile;
}

export interface UserProfile {
    id: number;
    loginId: string;
    nickname: string;
    email: string;
}

export interface JoinRequest {
    loginId: string;
    password: string;
    nickname: string;
    email: string;
}