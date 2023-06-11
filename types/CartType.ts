export interface CartType {
    product_id: number,
    product_code: string,
    name: string,
    price: number,
    image_url: string,
    description: string,
    qty: number,
    cartQty: number,
    event: boolean,
    origin_price: number,
}