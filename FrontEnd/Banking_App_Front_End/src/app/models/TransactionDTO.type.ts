export type TransactionDTO = {
    description:string,
    amount:number,
    isPaid?:boolean,
    date:string,
    userId:number
}