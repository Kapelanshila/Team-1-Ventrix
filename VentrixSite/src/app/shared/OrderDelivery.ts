export interface OrderDelivery {
    orderDeliveryId: Number
    clientOrderId: Number
    employeeId: Number
    dateId: Number
    timeslotId: Number
    signature: string
    rescheduled: boolean    
}