export interface DeleteAssetRepairVM {
    assetRepairId :number 
    assetId :number 
    assetRepairReasonId :number 
    assetRepaired:Boolean 
    date: Date
    reason:string
    description: string
    assetname: string
    userId:number
}
