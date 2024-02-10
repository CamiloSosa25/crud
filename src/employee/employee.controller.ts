import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { Employee } from "@prisma/client";

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
        return this.employeeService.getAll();
    }

    /**
     * Get an employee by ID.
     * @param {string} id - The ID of the employee.
     * @returns A promise that resolves to the Employee object with the specified ID.
     * @throws Error if the ID is not a number.
     */
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Employee> {
        if (isNaN(parseInt(id))) {
            throw new Error('Invalid ID must be a number.');
        }
        return this.employeeService.getById(Number(id));
    }

    /**
     * Create a new employee.
     * @param data - The data of the employee to be created.
     * @returns A promise that resolves to the created Employee object.
     */
    @Post()
    async create(@Body() data: Employee): Promise<Employee> {
        return this.employeeService.create(data);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: Employee): Promise<Employee> {
        if (isNaN(parseInt(id))) {
            throw new Error('Invalid ID must be a number.');
        }
        return this.employeeService.update(Number(id), data);
    }
}
