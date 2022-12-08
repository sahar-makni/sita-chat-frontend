import {ThemeOption} from "./theme.service";

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

interface UserResponse {
  id: number;
  email: string;
  theme: ThemeOption;
  language: string;
  roomsCount: number;
  messagesCount: number;
}

export  type SignInResponse = SignInSuccessResponse | SignInFailedResponse;
