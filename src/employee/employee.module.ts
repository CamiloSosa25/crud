import { Module } from "@nestjs/common";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    controllers: [EmployeeController],
    providers: [EmployeeService],
    imports: [PrismaModule],
    exports: [EmployeeService],
})
export class EmployeeModule { }