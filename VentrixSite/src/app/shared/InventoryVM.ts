import { Supplier } from "./Supplier"
import { Warehouse } from "./Warehouse"
import {InventoryCategory } from "./InventoryCategory"
import { InventoryType } from "./InventoryType"

export interface InventoryVM {
    inventoryId :number | undefined
    warehouse :Warehouse | undefined
    type:InventoryType | undefined
    category:InventoryCategory | undefined
    supplier:Supplier | undefined
    name:string | undefined
    quantityOnHand:number | undefined
}
