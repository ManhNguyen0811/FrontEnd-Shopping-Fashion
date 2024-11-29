export class Address {
    id: number;
    city: string;
    ward: string;
    street: string;
    isDefault: boolean;
    user :{id:number};


    constructor(
        id: number,
        city: string,
        ward: string,
        street: string,
        isDefault: boolean,
        user:{id: number}
    ) {
        this.id = id;
        this.city = city;
        this.ward = ward;
        this.street = street;
        this.isDefault = isDefault;
        this.user = user;
    }
}
