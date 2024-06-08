const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
    for (let i = 0; i < 10; i++) {
        await prisma.order.create({
            data: {
                courier_delivery_instructions: faker.lorem.sentence(),
                courier_job_id: faker.datatype.uuid(),
                delivery_address: faker.address.streetAddress(),
                delivery_instructions: faker.lorem.sentence(),
                delivery_postcode: faker.address.zipCode(),
                delivery_state: faker.address.stateAbbr(),
                delivery_suburb: faker.address.city(),
                invoice_number: faker.finance.accountNumber(),
                parcels: {
                    create: [
                        {
                            depth: faker.datatype.float({ min: 0.1, max: 1 }),
                            length: faker.datatype.float({ min: 0.1, max: 1 }),
                            name: faker.commerce.productName(),
                            weight: faker.datatype.float({ min: 0.1, max: 10 }),
                            width: faker.datatype.float({ min: 0.1, max: 1 }),
                            label_number: faker.datatype.uuid(),
                            courier_data: {},
                        },
                    ],
                },
                products: {
                    create: [
                        {
                            title: faker.commerce.productName(),
                            price: +faker.commerce.price(),
                            sku: faker.datatype.float({ min: 0.1, max: 100 }),
                            quantity: faker.datatype.number({ min: 1, max: 10 }),
                            tariff_code: faker.random.alphaNumeric(6),
                            dangerous_goods_code: faker.random.alphaNumeric(6),
                            dangerous_goods_text: faker.lorem.sentence(),
                            origin_country_code: faker.address.countryCode(),
                        },
                    ],
                },
                price: parseFloat(faker.commerce.price()),
                receiver_contact_number: faker.phone.number(),
                receiver_language_code: 'en-US', //faker.random.locale(),
                receiver_name: faker.person.firstName(),
                retailer_invoice: faker.finance.accountNumber(),
                slug: faker.lorem.slug(),
                state: faker.helpers.arrayElement(['pending', 'completed', 'shipped']),
                tracking_number: faker.datatype.uuid(),
                tracking_url: faker.internet.url(),
                tracking: {
                    create: [
                        {
                            tracking_number: faker.datatype.uuid(),
                            tracking_url: faker.internet.url(),
                            success: faker.datatype.boolean(),
                            track: {
                                create: [
                                    {
                                        status: faker.helpers.arrayElement([
                                            'Completed',
                                            'In Transit',
                                            'With Driver',
                                            'Ready For Pick Up',
                                        ]),
                                        date: faker.date.past(),
                                        timestamp: faker.datatype.number({ min: 10000, max: 99999 }),
                                        status_owner: faker.company.name(),
                                    },
                                ],
                            },
                        },
                    ],
                },
                user: {},
                customs_documents_require_printing: faker.datatype.boolean(),
                documents: {},
                merchant: {
                    create: {
                        store_name: faker.company.name(),
                        company_name: faker.company.name(),
                        contact_name: faker.person.firstName(),
                        contact_phone: faker.phone.number(),
                        shipping_cart_method_name: faker.lorem.word(),
                        preparation_time: faker.datatype.number({ min: 1, max: 120 }),
                        website_url: faker.internet.url(),
                        address_1: faker.address.streetAddress(),
                        suburb: faker.address.city(),
                        state: faker.address.stateAbbr(),
                        postcode: faker.address.zipCode(),
                        country_code: faker.address.countryCode(),
                    },
                },
                courier: {
                    create: {
                        courier_type: faker.helpers.arrayElement([
                            'CouriersPlease',
                            'eParcelExpress',
                            'Priority',
                            'DoorDashOndemand',
                        ]),
                        quotes: {},
                        service_level: faker.helpers.arrayElement([
                            'standard',
                            'express',
                            'priority',
                            'on_demand',
                        ]),
                        success: faker.datatype.boolean(),
                    },
                },
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
