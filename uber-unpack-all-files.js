// OFP uberlod.tpk XML unpacker
// Noah Domingues
// https://github.com/NoahDomingues

// THIS FILE EXTRACTS ALL XMLS. I'VE ONLY EVER FOUND ONE SINGLE FILE IN UBERLOD.TPK.
// If you need to extract just one XML file, use unpack-uber-single-file.js. Note that it will not preserve the file name.

// unpack-uber-all-files.js
const fs = require('fs');

const INPUT   = 'uber_lod.tpk';
const DATA    = fs.readFileSync(INPUT).toString('utf8');
const START   = /<\?xml[\s\S]*?<Objectlist>/g;
const END_TAG = '</Objectlist>';

let match, count = 0;
let offset = 0;

// Find each <?xml ... <Objectlist>
while ((match = START.exec(DATA)) !== null) {
  // match.index is where '<?xml' starts
  const startIdx = match.index;
  // find the closing tag after this match
  const endIdx = DATA.indexOf(END_TAG, startIdx);
  if (endIdx === -1) break;

  // slice out up to and including </Objectlist>
  const fragment = DATA.slice(startIdx, endIdx + END_TAG.length);
  fs.writeFileSync(`xml_chunk_${++count}.xml`, fragment, 'utf8');
}

console.log(`Extracted ${count} XML file${count === 1 ? '' : 's'}.`);
