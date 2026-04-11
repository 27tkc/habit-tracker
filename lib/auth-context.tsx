import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoadingUser: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );

  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred during sign up.";
    }
  };
  const signIn = async (email: string, password: string) => {
    try {
      const existingUser = await account.get().catch(() => null);

      if (existingUser) {
        console.log("Already logged in, skipping sign-in");
        return null;
      }

      await account.createEmailPasswordSession(email, password);
      const session = await account.get();
      setUser(session);
      return null;
    } catch (error) {
      console.error("Error signing in:", error);
      return error instanceof Error
        ? error.message
        : "An unknown error occurred during sign in.";
    }
  };
  const signOut = async () => {
    try {
      const currentUser = await account.get().catch(() => null);

      if (!currentUser) {
        console.log("No active session — user already logged out");
        setUser(null);
        return;
      }

      await account.deleteSession("current");
      console.log("Logged out successfully");
      setUser(null);
      return;
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoadingUser, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
