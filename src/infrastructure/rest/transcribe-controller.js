const express = require('express');
const router = express.Router();

const container = require('../../container');

const TranscriptStreamCommand = require('../../application/transcript-stream/transcript-stream-command');
const GetTranscriptCommand = require('../../application//get-transcript/get-transcript-command');

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

router.get('/:streamId', async (req, res) => {
  try {
    const {streamId} = req.params;
    const getTranscriptCommand = new GetTranscriptCommand({streamId})
    const getTranscript = container.resolve('getTranscript');
    const response = await getTranscript.execute(getTranscriptCommand);

    res.status(200).send(response);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Something wrong' });
  }
});

module.exports = router;
