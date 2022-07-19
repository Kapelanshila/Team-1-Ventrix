import { WarrantyPeriod } from "./WarrantyPeriod"
import { AssetCategory } from "./AssetCategory"
import { AssetType } from "./AssetType"
import { Warranty } from "./Warranty"

export interface AssetVM {
    assetId :number | undefined
    conditionId :number | undefined
    type:AssetType | undefined
    category:AssetCategory | undefined
    warrantyPeriod:WarrantyPeriod | undefined
    warranty:Warranty | undefined
    name:string | undefined
    manufacturer:string | undefined
}