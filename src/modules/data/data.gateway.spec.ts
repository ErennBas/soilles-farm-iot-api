import { Test, TestingModule } from '@nestjs/testing';
import { DataGateway } from './data.gateway';

describe('DataGateway', () => {
  let gateway: DataGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataGateway],
    }).compile();

    gateway = module.get<DataGateway>(DataGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
