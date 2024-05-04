import { number, object, string } from "zod";
import yargs from 'yargs';
import { prismaCatchErrors, schemaCatchErrors } from "./error_handling";
import { findBookedRooms } from "../prisma/queries/find";

const roomAvailability = async (roomNumber: number, entryDate: string) => {
    const rooms = await findBookedRooms(entryDate);
    const foundRoom = rooms.find(room => room.roomNumber === roomNumber);

    if (foundRoom) {
        console.log(`The room ${roomNumber} is booked for the given date.`);
    } else {
        console.log(`The room ${roomNumber} is free for the given date.`);
    }
};

const optionsSchema = object({
    'room-number': number(),
    'entry-date': string(),
});

const cli = async () => {

    const options = await yargs(process.argv.slice(2))
        .option('room-number', { type: 'number', description: 'Room number' })
        .option('entry-date', { type: 'string', description: 'Entry date to hotel' })
        .usage('Checks if a room is available for a given entry date.')
        .help().version(false).argv;

    schemaCatchErrors(optionsSchema, options);

    const roomNumber = options['room-number'] as number;
    const entryDate = options['entry-date'] as string;

    await prismaCatchErrors(roomAvailability(roomNumber, entryDate));
};

await cli();
