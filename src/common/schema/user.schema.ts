import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
    @Prop({ type: String })
    firstname: string;

    @Prop({ type: String })
    lastname: string;

    @Prop({ type: String })
    email: string;

    @Prop({ type :String })
    hashedpassword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
