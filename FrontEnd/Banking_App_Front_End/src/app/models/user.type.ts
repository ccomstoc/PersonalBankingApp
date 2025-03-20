import { Category } from "./Category.type";

export type User ={
    userId:number;
    name:string;
    userName:string;
    balance:number;
    userCategories:Array<Category>;
    valid?: boolean;

}