import yargs from 'yargs';
import { prismaCatchErrors } from './error_handling';
import { findAllBreeds } from '../prisma/queries/find';

const getAllBreeds = async (): Promise<void> => {
    const breeds = await findAllBreeds();
    if (breeds.length > 0) {
        for (const breed of breeds) {
            console.log(breed.breed);
        }
    } else {
        console.log('No breeds were found.');
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
