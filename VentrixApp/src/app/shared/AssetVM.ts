import { WarrantyPeriod } from "./WarrantyPeriod"
import { AssetCategory } from "./AssetCategory"
import { AssetType } from "./AssetType"
import { Warranty } from "./Warranty"

export interface AssetVM {
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
}