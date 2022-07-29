import { SupplierOrder } from "./SupplierOrder"
import { SupplierOrderLine } from "./SupplierOrderLine"

export interface SupplierResponse {
    inventories: SupplierOrderLine[]
    order: SupplierOrder
}
