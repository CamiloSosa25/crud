import { Injectable } from "@nestjs/common";
import { Employee } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

/**
 * Service class for managing employees.
 */
@Injectable()
export class EmployeeService {
    constructor(private prisma: PrismaService) {
        console.log('Employee Service created');
    }

    /**
     * Retrieves all employees.
     * @returns {Promise<Employee[]>} A promise that resolves to an array of employees.
     */
    getAll(): Promise<Employee[]> {
        return this.prisma.employee.findMany();
    }

    /**
     * Retrieves an employee by ID.
     * @param {int} id - The ID of the employee.
     * @returns {Promise<Employee>} A promise that resolves to the employee with the specified ID.
     */
    getById(id: number): Promise<Employee> {
        return this.prisma.employee.findUnique({
            where: {
                id: id
            }
        });
    }

    /**
     * Creates a new employee.
     * @param {Employee} data  - The data of the employee to be created.
     * @returns {Promise<Employee>} A promise that resolves to the created employee.
     */
    create(data: Employee): Promise<Employee> {
        return this.prisma.employee.create({
            data: data
        });
    }

    /**
     * Updates an employee by ID.
     * @param  {int} id - The ID of the employee to be updated.
     * @param {Employee} data - The updated data of the employee.
     * @returns A promise that resolves to the updated employee.
     */
    update(id: number, data: Employee): Promise<Employee> {
        return this.prisma.employee.update({
            where: {
                id: id
            },
            data: data
        });
    }

    /**
     * Deletes an employee by ID.
     * @param {int} id - The ID of the employee to be deleted.
     * @returns A promise that resolves to the deleted employee.
     */
    delete(id: number): Promise<Employee> {
        return this.prisma.employee.delete({
            where: {
                id: id
            }
        });
    }

    /**
     * Checks if an employee exists by ID.
     * @param {int} id - The ID of the employee.
     * @returns A promise that resolves to a boolean indicating if the employee exists.
     * @throws Error if the ID is not a number.
     */
    async exists(id: number): Promise<boolean> {
        if (isNaN(id)) {
            throw new Error('Invalid ID must be a number.');
        }
        const employee = await this.prisma.employee.findUnique({
            where: {
                id: id
            }
        });
        return !!employee;
    }
}
