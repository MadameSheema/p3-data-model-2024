import { db } from "../prisma/db";
import yargs from 'yargs';
import { object, string } from 'zod';
import { prismaCatchErrors, schemaCatchErrors } from "./error_handling";

const addDogToOwner = async (dogName: string, breed: string, email: string): Promise<void> => {
    const owner = await db.owner.findUnique({
        select: {
            email: true,
            ownerId: true
        },
        where: {
            email
        }
    });

    if (owner) {
        await db.dog.create({
            data: {
                name: dogName,
                breed,
                ownerId: owner?.ownerId
            }
        })

        console.log(`Added ${dogName} to ${owner.email}`)

    } else {
        console.log(`Owner with email '${email}' not found.`);
    }
};

const optionsSchema = object({
    dogname: string(),
    breed: string(),
    email: string(),
});

const cli = async () => {
    const options = await yargs(process.argv.slice(2)).option('dogname', { type: 'string', description: 'Name of the dog' })
        .option('breed', { type: 'string', description: 'Breed of the dog' })
        .option('email', { type: 'string', description: 'Email of the owner of the dog' })
        .usage('Adds a new dog to an existing owner.')
        .help().version(false).argv;

    schemaCatchErrors(optionsSchema, options);

    const dogName = options.dogname as string;
    const breed = options.breed as string;
    const email = options.email as string;

    await prismaCatchErrors(addDogToOwner(dogName, breed, email));
};

await cli();
