import { Url } from "./url.schema";
import { HydratedDocument } from "mongoose";
export type UserUrlDocument = HydratedDocument<UserUrl>;
export declare class UserUrl {
    userId: string;
    urls: Url[];
}
export declare const UserUrlSchema: import("mongoose").Schema<UserUrl, import("mongoose").Model<UserUrl, any, any, any, import("mongoose").Document<unknown, any, UserUrl> & UserUrl & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserUrl, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserUrl>> & import("mongoose").FlatRecord<UserUrl> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
