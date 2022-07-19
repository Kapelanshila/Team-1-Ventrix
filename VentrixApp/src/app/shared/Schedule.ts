export interface ScheduleVM {
    orderId: number;
    dateTimeSlotId: number;
}


export interface ReScheduleVM {
    deliveryId: number;
    dateTimeSlotId: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ReasonDescription: number;

}
