import { Asset } from "./Asset"

export interface EmployeeR {
    employeeId: Number
    name :String 
    surname: String
    idnumber: string
    phoneNumber: String
    homeAddress: String
    emailAddress: String
    titleId: Number
    userId: Number
    assets: Asset[];
    account:string
}