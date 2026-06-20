export class PrismaClient {
  constructor() {}
  async $connect() {
    return Promise.resolve();
  }
  async $disconnect() {
    return Promise.resolve();
  }
  carbonRecord = {
    createMany: () => Promise.resolve({ count: 4 }),
  };
}

const defaultMock = { PrismaClient };
export default defaultMock;
