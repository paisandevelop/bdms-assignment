import { Inject } from 'typedi';
import { RedisEngine } from '../redis/redis_engine';
import { logDebug } from '../log/log';

export class CacheLoginRepository {
  constructor(
    @Inject('RedisEngine')
    private cacheRedisEngine: RedisEngine
  ) {}

  async setLoginInfo(userInfo: any) {
    logDebug(`setLoginInfo:: start userInfo: ${JSON.stringify(userInfo)}`);
  
    await this.cacheRedisEngine.set(this.getLoginKey(userInfo.id), JSON.stringify(userInfo));
  }

  async getLoginInfo(usersId: string) {
    let result = await this.cacheRedisEngine.get(this.getLoginKey(usersId));
    return result;
  }

  private getLoginKey(userId: string) {
    return `login_${userId}`;
  }
}
