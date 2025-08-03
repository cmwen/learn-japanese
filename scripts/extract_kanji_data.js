import { kanjiData } from '../src/data/kanji.js';

kanjiData.forEach(kanji => {
  const unicodeHex = kanji.kanji.codePointAt(0).toString(16).padStart(5, '0');
  const strokeImgFilename = kanji.strokeOrderImg.split('/').pop();
  console.log(`${kanji.kanji}:${unicodeHex}:${strokeImgFilename}`);
});