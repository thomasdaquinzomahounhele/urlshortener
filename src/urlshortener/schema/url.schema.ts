import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Url extends Document {
    @Prop({ type: String })
    id: string;

    @Prop({ type: String })
    longUrl: string;

    @Prop({ type: String })
    shortUrl: string;

    @Prop({ type: Number })
    clickCount: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
