import { db } from "../prisma/db";

const getAllOwners = async () => {
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

await getAllOwners();