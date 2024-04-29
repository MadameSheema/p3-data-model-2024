import { db } from "../prisma/db";

const getAllBreeds = async () => {
    const breeds = await db.dog.findMany({
        select: {
            breed: true,
        },
        orderBy: {
            name: 'asc',
        },
        distinct: 'breed',
    })
    
    for(const breed of breeds) {
        console.log(breed.breed);
    }
};

await getAllBreeds();