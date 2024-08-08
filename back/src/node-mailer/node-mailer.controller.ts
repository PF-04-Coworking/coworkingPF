import { Controller } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';

@Controller('node-mailer')
export class NodeMailerController {
    constructor(private readonly nodeMailerService: NodeMailerService){}

    registerEmail(){
        return this.nodeMailerService.registerEmail()
    }
}
