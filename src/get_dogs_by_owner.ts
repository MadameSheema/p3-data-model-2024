import { object, string, type ZodError } from "zod";
import { db } from "../prisma/db";
import yargs from 'yargs';
import { prismaCatchErrors, schemaCatchErrors } from "./error_handling";
import { findDogs, findOwner } from "../prisma/queries/find";

const getDogsByOwner = async (email: string): Promise<void> => {
    const dogs = await findDogs(email);
    if (dogs.length === 0) {
        const owner = await findOwner(email);
        if (owner) {
            console.log(`Owner with email ${email} does not have any dog related.`);
        } else {
            console.log(`Owner with email ${email} does not exist in the database.`);
        }

    } else {
        for (const dog of dogs) {
            console.log(dog.name);
        }
    }
};

const optionsSchema = object({
    email: string(),
});

const cli = async () => {
    const options = await yargs(process.argv.slice(2)).option('email', { type: 'string', description: 'Email of the owner of the dog.' })
        .usage('Retrieves all the dogs names for a given owner using the email.')
        .help().version(false).argv;

    schemaCatchErrors(optionsSchema, options);

    const email = options.email as string;
    await prismaCatchErrors(getDogsByOwner(email));
};

await cli();
