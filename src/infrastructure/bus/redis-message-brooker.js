const { RedisClientName } = require('redis-smq-common/dist/types');
const { EQueueType } = require('redis-smq/dist/types');
const { promisifyAll } = require('bluebird');

class RedisMessageBroker {
  constructor({ redisSmq }) {
    this.redisSmq = redisSmq;
    this.config = {
      namespace: 'ns1',
      redis: {
        client: RedisClientName.IOREDIS,
        options: {
          host: 'redis',
          port: 6379,
        },
      },
      logger: {
        enabled: true,
        options: {
          level: 'info',
        },
      },
    };
  }

  _init() {
    this.QueueManagerAsync = promisifyAll(this.redisSmq.QueueManager);
    this.producer = promisifyAll(new this.redisSmq.Producer(this.config));
    this.consumer = promisifyAll(new this.redisSmq.Consumer(this.config));
  }


  async createQueue() {
    this._init();
    const queueManagerAsync = promisifyAll(
      await this.QueueManagerAsync.createInstanceAsync(this.config),
    );
    const queueAsync = promisifyAll(queueManagerAsync.queue);
    const exists = await queueAsync.existsAsync('test_queue');
    if (!exists) {
      await queueAsync.saveAsync('test_queue', EQueueType.LIFO_QUEUE);
    }
  };

  async consume() {
    await this.consumer.consumeAsync('test_queue', (message, cb) => {
      console.log('MESSAGE', message)
      cb();
    });

    await this.consumer.runAsync();
  };

  async produce() {
    await this.producer.runAsync();
    const msg = new this.redisSmq.Message();
    msg.setBody({ event: "______________SAD__________________" }).setQueue('test_queue');
    await this.producer.produceAsync(msg);
  };

}

module.exports = RedisMessageBroker;
