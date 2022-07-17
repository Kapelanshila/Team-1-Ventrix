import { WarrantyPeriod } from "./WarrantyPeriod"
import { AssetCategory } from "./AssetCategory"
import { AssetType } from "./AssetType"
import { Warranty } from "./Warranty"

export interface AssetVM {
    assetId :number | undefined
    conditionId :number | undefined
    assetTypeId:number | undefined
    warrantyId:number | undefined
    name:string | undefined
    manufacturer:string | undefined
    type: string | undefined
    category: string | undefined
    warrantyperiod: number | undefined
    condition: string | undefined
    warrantydate: Date
    UserId: number
    assetImage: string |undefined
}