
import prisma from '../../prisma/prismaClient.ts';
import { BadRequestError } from '../errors/http.errors.ts';

export const fetchBookings = async (orders: any) => {

    if (!orders || !orders.length) {
        throw new BadRequestError('The data given to this server does not meet our criteria.');
    }

    const books = await prisma.order.findMany({
        where: {
            tracking_number: {
                in: orders,
            },
        },
        include: {
            courier: true,
        },
    });

    const groupedByCourier = books.reduce((acc: any, order) => {
        const courierType = order.courier?.courier_type || 'Unknown';
        if (!acc[courierType]) {
            acc[courierType] = {
                courier: courierType,
                manifest: `Manifest${Math.floor(Math.random() * 100000)}`,
                manifest_pdf: 'https://shippit.com/manifest20160721-96368-1tpowvr.pdf',
                order_count: 0,
                success: true,
            };
        }
        acc[courierType].order_count += 1;
        return acc;
    }, {});

    return Object.values(groupedByCourier);
}