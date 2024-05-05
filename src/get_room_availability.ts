import { number, object, string } from "zod";
import yargs from 'yargs';
import { prismaCatchErrors, schemaCatchErrors } from "./error_handling";
import { findBookedRooms, findRoom } from "../prisma/queries/find";

const roomAvailability = async (roomNumber: number, date: string) => {
    const room = await findRoom(roomNumber);
    if (room) {
        const bookedRooms = await findBookedRooms(date);
        const foundRoom = bookedRooms.find(room => room.roomNumber === roomNumber);
        if (foundRoom) {
            console.log(`The room ${roomNumber} is booked for the given date.`);
        } else {
            console.log(`The room ${roomNumber} is free for the given date.`);
        }
    } else {
        console.log(`The room ${roomNumber} does not exist in the database.`);
    }
};

const optionsSchema = object({
    'room-number': number(),
    'date': string(),
});

const cli = async () => {

    const options = await yargs(process.argv.slice(2))
        .option('room-number', { type: 'number', description: 'Room number' })
        .demandOption('room-number', 'Required')
        .option('entry-date', { type: 'string', description: 'Entry date to hotel' })
        .demandOption('date', 'Required')
        .usage('Checks if a room is available for a given date.')
        .help().version(false).argv;

    schemaCatchErrors(optionsSchema, options);

    const roomNumber = options['room-number'] as number;
    const date = new Date(options['date'] as string).toISOString();

    await prismaCatchErrors(roomAvailability(roomNumber, date));
};

await cli();
