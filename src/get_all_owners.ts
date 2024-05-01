import yargs from "yargs";
import { db } from "../prisma/db";
import { prismaCatchErrors } from "./error_handling";

const getAllOwners = async (): Promise<void> => {
    const owners = await db.owner.findMany({
        select: {
            fullName: true,
        },
        orderBy: {
            fullName: 'asc',
        },
    })
    
    for(const owner of owners) {
        console.log(owner.fullName);
    }
};

const cli = async () => {
    await yargs(process.argv.slice(2))
    .usage('Retrieves all the dogs onwers names. No options needed.')
    .help().
    version(false)
    .argv;

    await prismaCatchErrors(getAllOwners());
};

await cli();