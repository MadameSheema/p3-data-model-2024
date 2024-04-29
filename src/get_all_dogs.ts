import { db } from "../prisma/db";

const getAllDogs = async () => {
    const dogs = await db.dog.findMany({
        select: {
            name: true,
        },
        orderBy: {
            name: 'asc',
        },
    })
    
    for(const dog of dogs) {
        console.log(dog.name);
    }
};

await getAllDogs();