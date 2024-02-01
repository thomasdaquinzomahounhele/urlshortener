import { Expose } from "class-transformer";

export class UserDto  {
    @Expose()
    id: string;

    @Expose()
    userId: string;
    
    @Expose()	
    firstname: string;

    @Expose()	
    lastname: string;

    @Expose()	
    email: string;

    @Expose()	
    hashedpassword: string;

    @Expose()	
    subscription: string;
}
