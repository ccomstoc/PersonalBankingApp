export type Transaction = {
    transactionId:number;
    date:string;
    amount:number;
    description:string;
    paid:boolean;
    paidOn?:(string | null);
    user:any;

}