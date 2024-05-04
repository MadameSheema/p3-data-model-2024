import yargs from "yargs";
import { prismaCatchErrors } from "./error_handling";
import { findBookedRooms } from "../prisma/queries/find";

const getBookedRooms = async (): Promise<void> => {
    const now = new Date().toISOString();
    const rooms = await findBookedRooms(now)

    if (rooms.length > 0) {
        for (const room of rooms) {
            console.log(room.name);
        }
    } else {
        console.log('All the rooms are available.');
    }
};

const cli = async () => {
    await yargs(process.argv.slice(2))
        .usage('Retrieves all the rooms that are currently booked. No options needed.')
        .help().
        version(false)
        .argv;

    await prismaCatchErrors(getBookedRooms());
};

await cli(); 