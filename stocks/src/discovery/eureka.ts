import { Eureka } from 'eureka-js-client';

export const registerWithEureka = (port: number) => {
    const client = new Eureka({
        instance: {
            app: 'stocks',
            hostName: 'localhost',
            ipAddr: '192.168.0.2',
            statusPageUrl: `http://localhost:${port}/stocks/1`,
            port: {
                '$': port,
                '@enabled': true,
            },
            vipAddress: 'stocks',
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
            },
        },
        eureka: {
            host: 'localhost',
            port: 8761,
            servicePath: '/eureka/apps/',
        },
    });

    client.start((error) => {
        if (error) {
            console.error('Error starting Eureka client:', error);
        } else {
            console.log('Eureka client started successfully');
        }
    });

    // Optionally, handle the shutdown of the client gracefully
    process.on('SIGINT', () => {
        client.stop();
    });
};
