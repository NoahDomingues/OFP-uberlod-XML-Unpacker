// OFP uberlod.tpk XML unpacker
// Noah Domingues
// https://github.com/NoahDomingues

// extract-uber-water-fixed.js
const fs = require('fs');

const IN   = 'uber_lod.tpk';
const OUT  = 'lakewater.xml';
const START_MARK = '<Objectlist>';            // reliable XML tag
const END_MARK   = '</Objectlist>';           // to trim trailing padding

// 1) Load full file
const data = fs.readFileSync(IN);

// 2) Convert to string once to locate XML
const text = data.toString('utf8');

// 3) Find your markers
const start = text.indexOf(START_MARK);
const end   = text.indexOf(END_MARK, start);
if (start < 0 || end < 0) {
  console.error('Could not find full <Objectlist>…</Objectlist> in the file.');
  process.exit(1);
}

// 4) Extract and write
const xmlFragment = text.slice(start, end + END_MARK.length);
fs.writeFileSync(OUT, xmlFragment, 'utf8');
console.log(`Wrote ${OUT}, ${xmlFragment.length} chars`);
