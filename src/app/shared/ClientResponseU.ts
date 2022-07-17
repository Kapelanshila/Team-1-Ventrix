import { ClientOrder } from "./ClientOrder"
import { ClientOrderLineUVM } from "./ClientOrderLineUVM"


export interface ClientResponseU {
    inventories: ClientOrderLineUVM[]
    order: ClientOrder
}
