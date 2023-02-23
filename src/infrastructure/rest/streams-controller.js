const express = require('express');
const router = express.Router();

const container = require('../../container');

const GetStreamsCommand = require('../../application/get-streams/get-streams-command');

router.get('/:twitchChannelId', async (req, res) => {
  try {
    const {twitchChannelId} = req.params;
    const getStreamsCommand = new GetStreamsCommand({twitchChannelId})
    const getStreams = container.resolve('getStreams');
    const response = await getStreams.execute(getStreamsCommand);

    res.status(200).json(response);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Something wrong' });
  }
});

module.exports = router;
