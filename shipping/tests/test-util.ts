import { faker } from '@faker-js/faker';
import prisma from '../prisma/prismaClient.ts';

export const createTestOrder = async (tracking_number) => {
    await prisma.order.create({
        data: {
            courier_delivery_instructions: faker.lorem.sentence(),
            courier_job_id: 'TEST1234',
            delivery_address: '1 Union Street',
            delivery_postcode: '2009',
            delivery_state: 'NSW',
            delivery_suburb: 'Pyrmont',
            invoice_number: 'SO42637',
            price: 100.0,
            receiver_contact_number: '0404342342',
            receiver_language_code: 'EN',
            receiver_name: 'Francois',
            slug: 'ppuqd0j0ulslm',
            state: 'completed',
            tracking_number: 'PPuqD0J0uLslM',
            tracking_url: faker.internet.url(),
            tracking: {
                create: {
                    tracking_number: 'PPuqD0J0uLslM',
                    tracking_url: faker.internet.url(),
                    success: true,
                    track: {
                        create: [
                            {
                                status: 'Completed',
                                date: new Date(),
                                timestamp: faker.number.int({ min: 10000, max: 99999 }),
                                status_owner: faker.company.name()
                            }
                        ]
                    }
                }
            },
            user: {
                create: {
                    email: 'test@shippit.com',
                    first_name: 'John',
                    last_name: 'Smith',
                }
            },
            customs_documents_require_printing: false,
            documents: {},
            merchant: {
                create: {
                    store_name: faker.company.name(),
                    company_name: faker.company.name(),
                    contact_name: faker.person.firstName(),
                    contact_phone: faker.phone.number(),
                    website_url: faker.internet.url(),
                    preparation_time: 5,
                    address_1: faker.location.streetAddress(),
                    suburb: faker.location.city(),
                    state: faker.location.state(),
                    postcode: faker.location.zipCode(),
                    country_code: faker.location.countryCode()
                }
            },
            courier: {
                create: {
                    courier_type: faker.helpers.arrayElement([
                        'CouriersPlease',
                        'eParcelExpress',
                        'Priority',
                        'DoorDashOndemand'
                    ]),
                    quotes: {},
                    service_level: faker.helpers.arrayElement([
                        'standard',
                        'express',
                        'priority',
                        'on_demand'
                    ]),
                    success: faker.datatype.boolean()
                }
            },
            parcels: {
                create: [
                    {
                        depth: 0.03,
                        length: 0.325,
                        name: 'Parcel 1',
                        weight: 0.5,
                        width: 0.205,
                        label_number: 'LABEL12345',
                        courier_data: {},
                    }
                ]
            }
        }
    });
};