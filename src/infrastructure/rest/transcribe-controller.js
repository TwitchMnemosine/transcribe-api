const express = require('express');
const router = express.Router();

const container = require('../../container');

router.post('/', async (req, res) => {
  try {
    
    const {streamId,twitchChannelId} = req.body;
    const transcriptStream = container.resolve('transcriptStream');
    const response = await transcriptStream.execute({streamId,twitchChannelId});

    res.json(response);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Something wrong' });
  }
});

module.exports = router;
