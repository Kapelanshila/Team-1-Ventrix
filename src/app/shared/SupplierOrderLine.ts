
export interface SupplierOrderLine{
    inventoryId :number| undefined
    warehouseId :Number | undefined
    inventoryTypeId:Number | undefined
    categoryId:Number | undefined
    supplierId:Number | undefined
    name:string | undefined
    quantity: number
    quantityOnHand:number | undefined
}
