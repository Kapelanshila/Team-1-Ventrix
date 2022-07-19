import { ClientOrder } from "./ClientOrder"
import { ClientOrderLine } from "./ClientOrderLine"

export interface ClientResponse {
    inventories: ClientOrderLine[]
    order: ClientOrder
}
