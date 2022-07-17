import { SupplierOrder } from "./SupplierOrder"
import { SupplierOrderLineUVM } from "./SupplierOrderLineUVM"


export interface SupplierResponseU {
    inventories: SupplierOrderLineUVM[]
    order: SupplierOrder
}
