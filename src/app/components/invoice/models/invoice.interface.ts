export interface Invoice {
    invoice_number: number;
    created_at:Date;
    sender_name:string;
    receiver_name:string;
    amount:number;
    iva:number;
    total:number;
}