import {ThemeOption} from './theme.service';
import {LanguageOption} from '../profile/profile.component';

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
  language: LanguageOption;
  roomsCount: number;
  messagesCount: number;
}

export  type SignInResponse = SignInSuccessResponse | SignInFailedResponse;

interface PatchUserBody {
  email: string;
  theme: ThemeOption;
  language: string;
}

export type PartialPatchUserBody = Partial<PatchUserBody>;


export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  status: number; // I have no idea why i would need this
}
