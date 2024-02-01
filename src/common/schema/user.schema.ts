import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ type: String })
    firstname: string;

    @Prop({ type: String })
    lastname: string;

    @Prop({ type: String })
    email: string;

    @Prop({ type :String })
    hashedpassword: string;

    @Prop({ type :String })
    subscription: string;

    @Prop({ type :String })
    userId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
