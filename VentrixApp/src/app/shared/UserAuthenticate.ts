export interface UserAuthenticate {
    userId: Number
    emailAddress : string 
    hashedPassword:string;
    token?: string;
}