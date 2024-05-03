import yargs from 'yargs';
import { db } from '../prisma/db';
import { prismaCatchErrors } from './error_handling';

const getAllBreeds = async (): Promise<void> => {
    const breeds = await db.dog.findMany({
        select: {
            breed: true,
        },
        orderBy: {
            name: 'asc',
        },
        distinct: 'breed',
    })

    for (const breed of breeds) {
        console.log(breed.breed);
    }
};

const cli = async () => {
    await yargs(process.argv.slice(2))
        .usage('Retrieves all the breeds. No options needed.')
        .help().
        version(false)
        .argv;

    await prismaCatchErrors(getAllBreeds());
};

await cli();
