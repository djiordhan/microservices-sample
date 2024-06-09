import prisma from '../../prisma/prismaClient.ts';
import { BadRequestError } from '../errors/http.errors.ts';

const generateTrackingNumber = () => {
    return `TRK${new Date().getTime()}`;
}

const buildResponse = (order: any) => {
    return {
        response: {
            id: order.id,
            tracking_number: order.tracking_number,
            state: order.state,
            processing_state: order.processing_state,
            delivery_address: order.delivery_address,
            delivery_suburb: order.delivery_suburb,
            delivery_postcode: order.delivery_postcode,
            receiver_name: order.receiver_name,
            receiver_contact_number: order.receiver_contact_number,
            courier_name: order.courier?.courier_type,
            slug: order.slug,
            price: order.price.toFixed(1),
            retailer_invoice: order.invoice_number,
            courier_job_id: order.courier_job_id,
            user_attributes: {
                email: order.user?.email,
                first_name: order.user?.first_name,
                last_name: order.user?.last_name,
            },
            parcel_attributes: order.parcels.map((parcel: any) => ({
                qty: 1,
                length: parcel.length,
                width: parcel.width,
                depth: parcel.depth,
                weight: parcel.weight,
            })),
        }
    };
};

const buildOrderInsertData = (order: any) => {
    return {
        courier_delivery_instructions: order.authority_to_leave || 'No',
        delivery_address: order.delivery_address,
        delivery_postcode: order.delivery_postcode,
        delivery_state: order.delivery_state,
        delivery_suburb: order.delivery_suburb,
        state: 'processing',
        tracking_number: generateTrackingNumber(),
        delivery_instructions: 'test special instructions',
        receiver_name: 'Josh',
        receiver_contact_number: '0400000000',
        slug: new Date().getTime() + '',
        price: 0.0,
        processing_state: 'created',
        retailer_invoice: '#23201005',
        courier_job_id: '30734876324',
        user: {
            create: {
                email: order.user_attributes.email,
                first_name: order.user_attributes.first_name,
                last_name: order.user_attributes.last_name,
                mobile: '0491570006', // Add mobile if needed
            },
        },
        parcels: {
            create: order.parcel_attributes.map((parcel: any) => ({
                depth: parcel.depth || 0.13,
                length: parcel.length || 0.1,
                name: 'Parcel', // You can update this with the actual name if provided
                weight: parcel.weight,
                width: parcel.width || 0.11,
                qty: parcel.qty || 1,
            })),
        },
        products: {
            create: order.product_attributes.map((product: any) => ({
                title: product.title,
                price: 29.13, // You can update this with the actual price if provided
                sku: 0.1, // You can update this with the actual SKU if provided
                quantity: product.quantity,
                tariff_code: '000999', // You can update this with the actual tariff code if provided
                dangerous_goods_code: 'ID8000', // You can update this with the actual dangerous goods code if provided
                dangerous_goods_text: 'ID8000 Consumer commodities - Dangerous Goods as per attached DGD', // Update if needed
                origin_country_code: 'TH', // Update if needed
            })),
        },
    }
}

const errorMessage = 'The data given to this server does not meet our criteria.';

export const cancelOrder = async (tracking_number: string) => {
    const queryIncludes = {
        parcels: true,
        courier: true,
        user: true
    };

    if (!tracking_number) {
        throw new BadRequestError(errorMessage);
    }

    const order = await prisma.order.findFirst({
        where: { tracking_number },
        include: queryIncludes
    });

    if (!order) {
        throw new BadRequestError(errorMessage);
    }

    const updatedOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
            state: 'cancelled',
            processing_state: 'processing_cancelled',
            price: 0.0,
        },
        include: queryIncludes
    });

    return buildResponse(updatedOrder);
};

export const trackOrder = async (tracking_number: string) => {
    if (!tracking_number) {
        throw new BadRequestError(errorMessage);
    }

    const order = await prisma.order.findFirst({
        where: { tracking_number },
        include: {
            tracking: {
                include: {
                    track: true,
                },
            },
        },
    });

    if (!order) {
        throw new BadRequestError(errorMessage);
    }

    return {
        tracking_number: order.tracking_number,
        tracking_url: order.tracking_url,
        success: order.tracking[0]?.success,
        track: order.tracking[0]?.track,
    };
};

export const createOrder = async (order: any) => {
    if (!order || !order.user_attributes || !order.parcel_attributes) {
        throw new BadRequestError(errorMessage);
    }

    const data: any = buildOrderInsertData(order);
    const createdOrder = await prisma.order.create({
        data,
        include: {
            user: true,
            parcels: true,
            products: true,
        }
    });

    return buildResponse(createdOrder);
}