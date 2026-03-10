export type OtpSessionId = string;

export type LoginRequest = {
  email?: string;
  phone: string;
  password?: string;
  fcmToken?: string;
  platform?: "web";
};

export type User = {
  id: string;
  email: string;
  phone: string;
  language: string;
};

export type LoginTokenResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export type LoginOtpResponse = {
  otpSessionId: OtpSessionId;
  code?: string; // Optional because it might only be sent in dev
};

export type LoginResponse = LoginTokenResponse | LoginOtpResponse;

export type VerifyOtpRequest = {
  code: string;
  otpSessionId: string;
};

export type VerifyOtpResponse = {
  access_token: string;
  refresh_token?: string;
  user: User;
};
export type ResendOtpRequest = {
  otpSessionId: OtpSessionId;
};
export type ProfileResponse = {
  sub: string;
  phone: string;
  email: string;
  role: string;
};

export type RequestChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type RequestForgotPassword = {
  phone: string;
};
export type ResponseForgotPassword = {
  code: string;
  otpSessionId: string;
};
export type VerifyForgotOtpRequest = {
  phone: string;
  otp: string;
  sessionId: string;
};

export type VerifyForgotOtpResponse = {
  resetToken: string;
};

export type RequestNewPassword = {
  token: string;
  newPassword: string;
};

export type RefreshTokenRequest = {
  refresh_token: string;
};

export type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};
