export interface VerifyTokenResponse {
  message: string;
}

export interface LoginResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    updatedAt: Date;
  };
  token: string;
}

export interface AuthUser {
  id: string;
  email: string;
  roles: string[];
}

export interface AuthLogin {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
