import yargs from "yargs";
import { db } from "../prisma/db";
import { prismaCatchErrors } from "./error_handling";

const getBookedRooms = async (): Promise<void> => {

    const now = new Date();

    const rooms = await db.room.findMany({
        select: {
            name: true
        },
        where: {
            bookings: {
                some: {
                    entryDate: {
                        lte: now
                    },
                    OR: [
                        { 
                            exitDate: { 
                                gte: now 
                            } 
                        },
                        { 
                            exitDate: null 
                        }
                    ]
                }
            }
        }
    });
    
    for(const room of rooms) {
        console.log(room.name);
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