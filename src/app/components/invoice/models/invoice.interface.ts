export interface Invoice {
    id:number;
    invoice_number: number;
    created_at:Date;
    sender_name:string;
    sender_nit:number
    receiver_name:string;
    receiver_nit:number;
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