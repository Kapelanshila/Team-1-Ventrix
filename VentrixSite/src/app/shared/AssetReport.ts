import { Supplier } from "./Supplier"
import { Warehouse } from "./Warehouse"
import {InventoryCategory } from "./InventoryCategory"
import { InventoryType } from "./InventoryType"
import { Account } from "./Account"

export interface AssetReport {
    assetId :number | undefined
    conditionId :number | undefined
    assetTypeId:number | undefined
    assetCategoryId:number | undefined
    warrantyId:number | undefined
    warrantyPeriodId: number | undefined
    name:string | undefined
    manufacturer:string | undefined
    type: string | undefined
    category: string | undefined
    warrantyperiod: number | undefined
    condition: string | undefined
    warrantyDate: Date
    assetImage: string | undefined
    assetStatus: string|null;
    warehouseId:number
    warehouse:string
    value: number
    account:string
}
