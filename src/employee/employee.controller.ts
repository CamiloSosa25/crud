import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { Employee } from "@prisma/client";
import { validate } from "class-validator";

/**
 * Controller for managing employee resources.
 */
@Controller('employee')
@UsePipes(new ValidationPipe({ transform: true }))
export class EmployeeController {

    constructor(private readonly employeeService: EmployeeService) { }

    /**
     * Get all employees.
     * @returns A promise that resolves to an array of Employee objects.
     */
    @Get()
    async getAll(): Promise<Employee[]> {
        const employees = await this.employeeService.getAll();
        if (!employees.length) throw new NotFoundException('No employees found.');
        return employees;
    }

    /**
     * Get an employee by ID.
     * @param {string} id - The ID of the employee.
     * @returns A promise that resolves to the Employee object with the specified ID.
     * @throws Error if the ID is not a number.
     */
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Employee> {
        if (isNaN(Number(id))) {
            throw new BadRequestException('Invalid ID must be a number.');
        }
        const employee = await this.employeeService.getById(Number(id));
        if (!employee) throw new NotFoundException('Employee not found.');
        return employee;
    }

    /**
     * Create a new employee.
     * @param {Employee} data - The data of the employee to be created.
     * @returns A promise that resolves to the created Employee object.
     */
    @Post()
    async create(@Body() data: Employee): Promise<Employee> {
        if (validate(data)) throw new BadRequestException('Invalid data.');
        return this.employeeService.create(data);
    }

    /**
     * Update an employee by ID.
     * @param {string} id - The ID of the employee to be updated.
     * @param {Employee} data - The updated data of the employee.
     * @returns A promise that resolves to the updated Employee object.
     * @throws Error if the ID is not a number or if the employee is not found.
     */
    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: Employee): Promise<Employee> {
        if (isNaN(Number(id))) {
            throw new BadRequestException('Invalid ID must be a number.');
        }
        if (!await this.employeeService.exists(Number(id))) {
            throw new NotFoundException('Employee not found.');
        }
        return this.employeeService.update(Number(id), data);
    }

    /**
     * Delete an employee by ID.
     * @param {string} id - The ID of the employee to be deleted.
     * @returns A promise that resolves to the deleted Employee object.
     * @throws Error if the ID is not a number or if the employee is not found.
     */
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Employee> {
        if (isNaN(Number(id))) {
            new BadRequestException('Invalid ID must be a number.');
        }
        if (!await this.employeeService.exists(Number(id))) {
            throw new NotFoundException('Employee not found.');
        }
        return this.employeeService.delete(Number(id));
    }

}
