import { Controller, Get, Render } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get()
    @Render('backend/auth/admin')
    getHello() {
        return this.adminService.getHello();
    }
}
