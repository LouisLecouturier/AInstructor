import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
        message : string,
        'acces token' : string,
        'refresh token' : string,
        user : string,
        user_id : number,
        first_name : string,
        last_name : string,
        email : string,
        is_teacher : boolean
    };
  }
}