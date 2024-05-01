import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import type { ZodError, ZodObject } from 'zod';

export const prismaCatchErrors = async (myMethod: any) => {
    try {
        return await myMethod
    } catch (e) {
        const prismaError = e as PrismaClientValidationError;
        console.log(prismaError.message);
        process.exit(1);
    }
}

export const schemaCatchErrors = async (optionsSchema: ZodObject<any>, options: any) => {
    try {
        optionsSchema.parse(options);
    } catch (e) {
        const zodError = e as ZodError;
        zodError.errors.map(err => {
            const path = err.path.join('.');
            console.log(`The field "${path}", is ${err.message.toLowerCase()}`);
        });
        process.exit(1);
    }

}