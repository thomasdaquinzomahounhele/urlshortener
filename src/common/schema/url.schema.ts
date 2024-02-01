import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UrlDocument = HydratedDocument<Url>;

@Schema()
export class Url {
    @Prop({ type: String })
    id: string;

    @Prop({ type: String })
    longUrl: string;

    @Prop({ type: String })
    shortUrl: string;

    @Prop({ type: Number })
    clickCount: number;

    @Prop({ type: Date, required: true })    
    createdAt: Date;

    @Prop({ type: String })
    createdBy: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
