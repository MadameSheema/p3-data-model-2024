import yargs from "yargs";
import { db } from "../prisma/db";
import { prismaCatchErrors } from "./error_handling";

const getAllDogs = async (): Promise<void> => {
    const dogs = await db.dog.findMany({
        select: {
            name: true,
        },
        orderBy: {
            name: 'asc',
        },
    })

    for (const dog of dogs) {
        console.log(dog.name);
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