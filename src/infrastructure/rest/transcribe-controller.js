const express = require('express');
const router = express.Router();

const container = require('../../container');

const TranscriptStreamCommand = require('../../application/transcript-stream/transcript-stream-command');

router.post('/', async (req, res) => {
  try {
    
    const {streamId} = req.body;
    const transcriptStreamCommand = new TranscriptStreamCommand({streamId})
    const transcriptStream = container.resolve('transcriptStream');
    await transcriptStream.execute(transcriptStreamCommand);

    res.status(201).send();
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Something wrong' });
  }
});

module.exports = router;
