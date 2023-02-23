const { RedisClientName } = require('redis-smq-common/dist/types');
const { EQueueType } = require('redis-smq/dist/types');
const { promisifyAll } = require('bluebird');

class RedisMessageBroker {
  constructor({ redisSmq }) {
    this.redisSmq = redisSmq;
    this.config = {
      namespace: 'Mnemosine',
      redis: {
        client: RedisClientName.REDIS,
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

  // TODO: Improve or delete.
  pendingMessages(){
    this.redisSmq.MessageManager.createInstance(this.config, (err, messageManager) => {
      if (err) console.log(err);
      else {
        console.log(messageManager.pendingMessages.list('transcribe', 0, 100, (err, res) => {
          console.log(res)
        }))
      }
    })
  }


  async createQueue(queueTopic) {
    this._init();
    const queueManagerAsync = promisifyAll(
      await this.QueueManagerAsync.createInstanceAsync(this.config),
    );
    const queueAsync = promisifyAll(queueManagerAsync.queue);
    const exists = await queueAsync.existsAsync(queueTopic);
    if (!exists) {
      await queueAsync.saveAsync(queueTopic, EQueueType.LIFO_QUEUE);
    }
  };

  // TODO: Remove this if is not going to be used
  async consume(queueTopic) {
    await this.consumer.consumeAsync(queueTopic, (message, cb) => {
      cb();
    });

    await this.consumer.runAsync();
  };

  async produce(domainEvents) {
    await this.producer.runAsync();

    for (let domainEvent of domainEvents) {
      const msg = new this.redisSmq.Message();
      const payload = { ...domainEvent.name, ...domainEvent.domain };
     
      msg.setBody(payload)
        .setQueue(domainEvent.topic)
        .setRetryThreshold(100)
        .setRetryDelay(3000);
      await this.producer.produceAsync(msg);
    }
  };

}

module.exports = RedisMessageBroker;
