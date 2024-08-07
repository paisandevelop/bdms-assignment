import { RedisClientType, createClient } from 'redis';
import * as zlib from 'zlib';

import { Service } from 'typedi';

@Service()
export class RedisEngine {
  private client: RedisClientType;
  private static instance: RedisEngine | null = null;

  constructor(host: string, password: string | undefined) {
    this.client = createClient({
      url: `redis://${host}`,
      password: password,
    });

    this.client.on('error', (error: string) => console.error(`RedisEngine : ${error}`));
    this.client.connect();
  }

  static getInstance(host: string, password: string | undefined): RedisEngine {
    if (!RedisEngine.instance) {
      RedisEngine.instance = new RedisEngine(host, password);
    }

    return RedisEngine.instance;
  }

  static newInstanceFromEnv(): RedisEngine {
    const host = `${process.env.CACHE_REDIS_IMPORT_RESULT_HOST}`;
    const password = process.env.CACHE_REDIS_IMPORT_RESULT_PASSWORD;
    return new RedisEngine(host, password);
  }

  getClient(): RedisClientType {
    return this.client;
  }

  async set(key: string, value: string, timeout?: number): Promise<void> {
    if (timeout) {
      await this.client.setEx(key, timeout, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async setBuffer(key: string, value: string, timeout?: number): Promise<void> {
    if (timeout) {
      await this.client.setEx(key, timeout, zlib.deflateSync(value).toString('base64'));
    } else {
      await this.client.set(key, zlib.deflateSync(value).toString('base64'));
    }
  }

  async get(key: string): Promise<any | null> {
    let value = (await this.client.get(key)) ?? null;

    if (value) {
      value = JSON.parse(value);
    }

    return value;
  }

  async getBuffer(key: string): Promise<any | null> {
    let value = (await this.client.get(key)) ?? null;

    if (value) {
      value = JSON.parse(zlib.inflateSync(Buffer.from(value, 'base64')).toString());
    }

    return value;
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async flushByPrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(prefix + '*');

    if (keys?.length) {
      await this.client.del(keys);
    }
  }

  async flushAll(): Promise<void> {
    await this.client.flushAll();
  }
}
