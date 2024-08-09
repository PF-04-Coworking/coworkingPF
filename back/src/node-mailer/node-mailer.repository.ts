import { Injectable } from "@nestjs/common";

@Injectable()
export class NodeMailerRepository{
    contactEmail() {
        throw new Error('Method not implemented.');
    }
    successEmail() {
        throw new Error('Method not implemented.');
    }
    reservationEmail() {
        throw new Error('Method not implemented.');
    }

    registerEmail(){
        return; 
    }
}