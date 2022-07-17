export interface Asset {
    assetId :number
    conditionId :number
    assetTypeId:number
    warrantyId:number 
    warehouseId:number
    name:string 
    manufacturer:string
    assetStatus: string|null;
}
