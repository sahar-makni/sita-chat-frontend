export interface SignInRequest {
  email: string;
  password: string;
}


interface SignInSuccessResponse {
  accessToken: string;
}

interface SignInFailedResponse {
  error: string;
}

export  type SignInResponse = SignInSuccessResponse | SignInFailedResponse
