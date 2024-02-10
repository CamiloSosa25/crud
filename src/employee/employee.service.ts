import { Injectable } from "@nestjs/common";
import { Employee } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EmployeeService {
    constructor(private prisma: PrismaService) {
        console.log('Employee Service created');

    }

    getAll(): Promise<Employee[]> {
        return this.prisma.employee.findMany();
    }

    getById(id: number): Promise<Employee> {
        return this.prisma.employee.findUnique({
            where: {
                id: id
            }
        });
    }

    create(data: Employee): Promise<Employee> {
        return this.prisma.employee.create({
            data: data
        });
    }

    update(id: number, data: Employee): Promise<Employee> {
        return this.prisma.employee.update({
            where: {
                id: id
            },
            data: data
        });
    }
}