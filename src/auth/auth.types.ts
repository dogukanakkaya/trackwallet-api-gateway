export interface User {
    id: string;
    name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    sign_in_provider: string;
    createdAt: Date;
    updatedAt: Date;
}