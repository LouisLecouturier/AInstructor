declare module "next-auth" {
  interface Session {
    user: {
        message : string,
        access_token : string,
        refresh_token : string,
        user : string,
        user_id : number,
        first_name : string,
        last_name : string,
        email : string,
        isTeacher : boolean
    };
  }
}