import { db } from "../prisma/db";

const getBookedRooms = async () => {

    const now = new Date();

    const rooms = await db.room.findMany({
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

await getBookedRooms(); 