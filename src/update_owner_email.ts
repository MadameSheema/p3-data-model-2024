import { db } from "../prisma/db";
import yargs from 'yargs';
import { object, string, ZodError } from 'zod';
import { prismaCatchErrors, schemaCatchErrors } from "./error_handling";

const updateOwnerEmail = async (email: string, newEmail: string): Promise<void> => {
    await db.owner.update({
        where: {
            email
        },
        data: {
            email: newEmail
        }
    });

    console.log(`The email has been updated with ${newEmail}`);
};

const optionsSchema = object({
    email: string(),
    'new-email': string(),
});

const cli = async () => {
    const options = await yargs(process.argv.slice(2)).option('email', { type: 'string', description: 'Current email of the owner' })
        .option('new-email', { type: 'string', description: 'New email of the owner' })
        .usage('Adds a new dog to an existing owner.')
        .help().version(false).argv;

    schemaCatchErrors(optionsSchema, options);

    const email = options.email as string;
    const newEmail = options['new-email'] as string;

    await prismaCatchErrors(updateOwnerEmail(email, newEmail));
};

await cli();
