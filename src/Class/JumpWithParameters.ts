import { session } from './Session';
export class JumpWithParameters {
  private mapKey: string;
  private cachedData: any;
  constructor() {
    this.mapKey = 'JUMPWITHPARAMETERS';
    this.initCachedData();
  }
  // 获取会话窗口的缓存数据
  initCachedData() {
    const cache = session.get(this.mapKey);
    if (cache) {
      this.cachedData = cache;
    } else {
      session.set(this.mapKey, {});
      this.cachedData = {};
    }
  }
  getCachedData(key: string) {
    return this.cachedData[key];
  }
  setCachedData(sessionKey: string, data: any, callbaclk: (arg0: any) => any) {
    this.cachedData[sessionKey] = data;
    session.set(this.mapKey, this.cachedData);
    callbaclk && callbaclk(sessionKey);
  }
  clearCachedData(sessionKey: string) {
    if (this.cachedData[sessionKey]) {
      delete this.cachedData[sessionKey];
      session.set(this.mapKey, this.cachedData);
    }
  }
}
