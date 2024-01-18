import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Url extends Document {
    @Prop()
    id: string;

    @Prop()
    longUrl: string;

    @Prop()
    shortUrl: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
