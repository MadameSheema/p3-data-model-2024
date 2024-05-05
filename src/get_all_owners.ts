import yargs from "yargs";
import { prismaCatchErrors } from "./error_handling";
import { findAllOwners } from "../prisma/queries/find";

const getAllOwners = async (): Promise<void> => {
    const owners = await findAllOwners();
    if (owners.length > 0) {
        for (const owner of owners) {
            console.log(owner.fullName);
        }
    } else {
        console.log('No owners were found.');
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