import { Supplier } from "./Supplier"
import { Warehouse } from "./Warehouse"
import {InventoryCategory } from "./InventoryCategory"
import { InventoryType } from "./InventoryType"
import { Account } from "./Account"

export interface InventoryReport {
    inventoryId :number | undefined
    warehouse :Warehouse | undefined
    type:InventoryType | undefined
    category:InventoryCategory | undefined
    supplier:Supplier | undefined
    name:string | undefined
    quantityOnHand:number | undefined
    account: string
}