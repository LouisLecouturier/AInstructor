import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      first_name: string;
      last_name: string;
      isTeacher: boolean;
      accessToken: string;
      refreshToken: string;
      message: string;
        
    };
  }
}
