import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WitService {
  private readonly accessToken = 'KMMVFYCG2EQOSVXKKZCNH3DT6YPBZZ2P'; //!Cambiar a .env cuando esté funcionando

  async queryWitAI(message: string): Promise<any> {
    const response = await axios.get(
      `https://api.wit.ai/message?v=20240304&q=${encodeURIComponent(message)}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );
    return response.data;
  }
}
