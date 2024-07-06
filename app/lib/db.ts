import Redis from 'ioredis';

const client = new Redis({
    host: process.env.REDIS_URL,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
    },
});

client.on('error', (error) => {
    console.error('Redis Client Error:', error);
});

export { client };
