import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Url, UrlSchema } from "./url.schema";
import { HydratedDocument } from "mongoose";

export type UserUrlDocument = HydratedDocument<UserUrl>;

@Schema()
export class UserUrl {
    @Prop({ type: String })
    userId: string;

    @Prop({ type: [UrlSchema] })
    urls: Url[]
}

export const UserUrlSchema = SchemaFactory.createForClass(UserUrl);
