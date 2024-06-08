import 'reflect-metadata';
import prisma from './prisma/prismaClient.ts';

process.env.DATABASE_URL = 'mongodb://localhost:27017/shipping-test';

async function setup() {
    try {
        await prisma.track.deleteMany({});
        await prisma.tracking.deleteMany({});
        await prisma.parcel.deleteMany({});
        await prisma.product.deleteMany({});
        await prisma.order.deleteMany({});
        await prisma.merchant.deleteMany({});
        await prisma.courier.deleteMany({});
        await prisma.user.deleteMany({});
    } catch (err) {
        console.log(err.message);
    }
}

setup();