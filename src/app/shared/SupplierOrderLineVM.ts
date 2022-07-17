import { InventoryCategory } from "./InventoryCategory"
import { InventoryType } from "./InventoryType"
import { Supplier } from "./Supplier"
import { Warehouse } from "./Warehouse"

export interface SupplierOrderLineVM {
    inventoryId :number | undefined
    warehouse :Warehouse | undefined
    type:InventoryType | undefined
    category:InventoryCategory | undefined
    supplier:Supplier | undefined
    name:string | undefined
    quantityOnHand:number | undefined
    quantity: number
    selected: boolean
    added:boolean
}
