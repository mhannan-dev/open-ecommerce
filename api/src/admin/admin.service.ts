import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getHello(): { message: string } {
    return { message: 'You have successfully accessed the Admin dashboard!' };
  }
}
