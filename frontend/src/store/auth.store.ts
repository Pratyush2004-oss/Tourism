import { User } from "@/services/types";
import { create } from "zustand";

type UserInput = {
    name: string;
    username: string;
    mobile: string;
    password: string;
    isoCode: string;
};

type LoginInput = {
    mobile: string;
    password: string;
    isoCode: string;
};

interface AuthStore {
  isAuthenticated: boolean;
  isAdmin: boolean;
  error: string | null;
  user: User | null;
  token: string | null;
  signup: (userInput: UserInput) => Promise<void>;
  chackAuth: () => Promise<void>;
  chackAdmin: () => Promise<void>;
  login: (user: LoginInput) => Promise<void>;
  logout: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  error: null,
  user: null,
  token: null,
  signup: async (userInput) => {},
  login: async (userInput) => {},
  chackAuth: async () => {},
  chackAdmin: async () => {},
  logout: () => {},
  reset: () =>
    set({
      isAuthenticated: false,
      isAdmin: false,
      error: null,
      user: null,
      token: null,
    }),
}));
