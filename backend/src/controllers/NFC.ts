import { Request, Response } from 'express';
const { NFC, KEY_TYPE_A } = require('nfc-pcsc');
const ndef = require('ndef');

export const NFCwrite = async (req: Request, res: Response) => {
  const nfc = new NFC();

  const { productId } = req.body;

  const productUrl = `dAPP.com/${productId}`;

  // Create a NDEF message with the URL
  const ndefMessage = ndef.encodeMessage([
    ndef.uriRecord(productUrl)
  ]);

  // Convert the NDEF message to a Buffer
  const data = Buffer.from(ndefMessage);

  nfc.on('reader', async (reader: any) => {
    console.log("Reader detected");

    reader.autoProcessing = true;

    reader.on('card', async (card: any) => {
      console.log("Card detected");

      const key = 'FFFFFFFFFFFF'; // Key A
      const keyType = KEY_TYPE_A;


      try {

        await reader.authenticate(4, keyType, key);
        console.log(`Card authenticated`);
        
        await reader.write(4, data);
        console.log(`data written`);
        res.json({message: "NFC tag written successfully"});
      } catch (err) {
        console.error(`error when writing data`, err);
        res.status(500).json({message: "Error writing NFC tag"});
      }
    });

    reader.on('error', (err: any) => {
      console.error(`Reader error: ${err}`);
    });

    reader.on('end', () => {
      console.log('Reader disconnected');
    });
  });

  nfc.on('error', (err: any) => {
    console.error(`NFC error: ${err}`);
  });
};
