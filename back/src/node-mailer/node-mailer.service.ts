import { Injectable } from '@nestjs/common';
import { NodeMailerRepository } from './node-mailer.repository';

@Injectable()
export class NodeMailerService {
    constructor(private readonly nodeMailerRepository: NodeMailerRepository){}
    registerEmail() {
        return this.nodeMailerRepository.registerEmail();
    }
}
