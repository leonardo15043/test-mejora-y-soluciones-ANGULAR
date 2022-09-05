export interface Product{
    id:number;
    description:string;
    unit_value:number;
    total_value:number;
    units_product:number;
    created_at?:Date;
    updated_at?:Date;
}