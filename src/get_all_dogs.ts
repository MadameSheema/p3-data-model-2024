import yargs from "yargs";
import { prismaCatchErrors } from "./error_handling";
import { findAllDogs } from "../prisma/queries/find";

const getAllDogs = async (): Promise<void> => {
    const dogs = await findAllDogs();
    if (dogs.length > 0) {
        for (const dog of dogs) {
            console.log(dog.name);
        }
    }
    else {
        console.log('No dogs were found.');
    }
};

const cli = async () => {
    await yargs(process.argv.slice(2))
        .usage('Retrieves all the dogs names. No options needed.')
        .help().
        version(false)
        .argv;

    await prismaCatchErrors(getAllDogs());
};

await cli();