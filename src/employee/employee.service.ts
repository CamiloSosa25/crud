import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EmployeeService {
    constructor(private prisma: PrismaService) {
        console.log('Employee Service created');

    }

    getAll() {
        return this.prisma.employee.findMany();
    }
}