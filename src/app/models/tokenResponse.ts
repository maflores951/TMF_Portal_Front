export interface TokenResponse
    {
        TokenResponseId?: number;

        AccessToken: string;

        TokenType: string;

        ExpiresIn: number;

        UserName: string;

        Issued: Date | string;

        Expires: Date | string;

        ErrorDescription: string;
}

