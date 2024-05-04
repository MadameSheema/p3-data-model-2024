import yargs from 'yargs';
import { object, string } from 'zod';
import { prismaCatchErrors, schemaCatchErrors } from "./error_handling";
import { findOwner } from "../prisma/queries/find";
import { createDog } from "../prisma/queries/create";

const addDogToOwner = async (dogName: string, breed: string, email: string): Promise<void> => {
    const owner = await findOwner(email);

    if (owner) {
        await createDog(dogName, breed, owner?.ownerId);
        console.log(`Added ${dogName} to ${email}}`);

    } else {
        console.log(`Owner with email '${email}' not found.`);
    }
};

const optionsSchema = object({
    'dog-name': string(),
    breed: string(),
    email: string(),
});

const cli = async () => {
    const options = await yargs(process.argv.slice(2)).option('dog-name', { type: 'string', description: 'Name of the dog' })
        .demandOption('dog-name', 'Required')
        .option('breed', { type: 'string', description: 'Breed of the dog' })
        .demandOption('breed', 'Required')
        .option('email', { type: 'string', description: 'Email of the owner of the dog' })
        .demandOption('email', 'Required')
        .usage('Adds a new dog to an existing owner.')
        .help().version(false).argv;

    schemaCatchErrors(optionsSchema, options);

    const dogName = options['dog-name'] as string;
    const breed = options.breed as string;
    const email = options.email as string;

    await prismaCatchErrors(addDogToOwner(dogName, breed, email));
};

await cli();
