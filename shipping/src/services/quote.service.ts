import prisma from '../../prisma/prismaClient.ts';
import { BadRequestError } from '../errors/http.errors.ts';

export const getQuotes = async (quote: any) => {
    if (!quote || !quote.dropoff_postcode || !quote.dropoff_state || !quote.dropoff_suburb || !quote.parcel_attributes) {
        throw new BadRequestError('Dutiable amount must be greater than 0 for international orders');
    }

    const couriers = await prisma.courier.findMany({});
    return couriers.map(courier => ({ ...courier, quotes: [{ price: 20, estimated_transit_time: "3 business days" }] }));
};

