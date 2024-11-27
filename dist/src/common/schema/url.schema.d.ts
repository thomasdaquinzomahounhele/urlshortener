import { HydratedDocument } from "mongoose";
export type UrlDocument = HydratedDocument<Url>;
export declare class Url {
    id: string;
    longUrl: string;
    shortUrl: string;
    clickCount: number;
    createdAt: Date;
    createdBy: string;
}
export declare const UrlSchema: import("mongoose").Schema<Url, import("mongoose").Model<Url, any, any, any, import("mongoose").Document<unknown, any, Url> & Url & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Url, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Url>> & import("mongoose").FlatRecord<Url> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
