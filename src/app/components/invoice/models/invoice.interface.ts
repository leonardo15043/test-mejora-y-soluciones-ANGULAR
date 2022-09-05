export interface Invoice {
    id:number;
    invoice_number: number;
    created_at:Date;
    sender_name:string;
    receiver_name:string;
    amount:number;
    iva:number;
    total:number;
}

export interface InvoiceProduct{
    id?:number;
    id_invoice:number;
    id_product:number;
    units_product:number;
    total_value:number;
}