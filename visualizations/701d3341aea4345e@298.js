function _1(md){return(
md`# Data Utilities`
)}

function _printTableTypesHeader(md){return(
md`Miscellaneous data utilities for Observable notebooks. This is a fork of the UW Interactive Lab's [Data Utilities](https://observablehq.com/@uwdata/data-utilities) with the following additions:
* Added [*printTableTypes*](#printTableTypes) to print data types
* Added [_countOccurrences_](https://observablehq.com/@jonfroehlich/data-utilities#cell-267) to count occurrences of properties
* Added simple statistics like median, mean, and standard deviation`
)}

function _printTableHeader(md){return(
md`
## printTable(_data[, header, width]_)

Print an array of _data_ objects as an HTML-formatted table.

The optional _header_ array indicates which fields to include and in what order. The _header_ array values can be either a property name string or an object with the following properties:

- \`field\` - object property name
- \`title\` - [optional] column title to display
- \`align\` - [optional] alignment, one of \`'l'\`, \`'c'\`, or \`'r'\` (left, center, or right).

The optional _width_ parameter specifies the maximum width of the table, in pixels. If \`null\` or zero, the maximum width will be inherited from CSS. If \`undefined\` or not a number, Observable's \`width\` value will be used.

TODO:
* add in formatting array
* add in auto-sum bottom row (that is bolded)
`
)}

function _printTable(width,printValue,html){return(
function printTable(data, header, maxWidth, printStringsWithQuotes=true) {
  const Align = {
    l: 'left',
    c: 'center',
    r: 'right'
  };
  
  const cellStyle = 'padding: 1px 3px; white-space: nowrap;';
 
  header = header || (data[0] && Object.keys(data[0]));
  if (!header) return '';
  const fields = header.map(h => (h && h.field || h) + '');
  const styles = header.map(h => {
    return `style="text-align:${h && Align[h.align] || Align.l}; ${cellStyle}"`;
  });
  
  const lines = [];
  const maxw = maxWidth || maxWidth === undefined
    ? ` style="max-width:${+maxWidth || width}px"`
    : '';
  lines.push(`<table${maxw}>`);
  
  // header row
  lines.push('<thead><tr>');
  header.forEach((h, i) => {
    lines.push(`<th ${styles[i]}>${h && h.title || h}</th>`);
  });
  lines.push('</tr></thead>');
  
  // data rows

  lines.push('<tbody>');
  data.forEach(d => {
    lines.push('<tr>');
    fields.map((f, i) => {
      lines.push(`<td ${styles[i]}>${printValue(d[f], printStringsWithQuotes)}</td>`);
    });
    lines.push('</tr>');
  });
  lines.push('</tbody>');
  
  lines.push('</table>');
  return html`<div style="overflow-x: auto;">${lines.join('')}</div>`;
}
)}

function _printValue(dateString){return(
function printValue(v, printStringsWithQuotes=true) {
  if (v instanceof Date) {
    if (v.getHours() === 0 &&
        v.getMinutes() === 0 &&
        v.getSeconds() === 0 &&
        v.getMilliseconds() === 0)
    {
      return dateString(v.getFullYear(), v.getMonth()+1, v.getDate());
    } else if (v.getUTCHours() === 0 &&
               v.getUTCMinutes() === 0 &&
               v.getUTCSeconds() === 0 &&
               v.getUTCMilliseconds() === 0)
    {
      return dateString(v.getUTCFullYear(), v.getUTCMonth()+1, v.getUTCDate());
    } else {
      return v.toISOString();
    }
  } else {
    if((typeof v === 'string' || v instanceof String) && printStringsWithQuotes){
      return JSON.stringify(v);
    }
    return String(v);
  }
}
)}

function _dateString(){return(
function dateString(year, month, date) {
  return `${year}-${(month < 10 ? '0' : '') + month}-${(date < 10 ? '0' : '') + date}`;
}
)}

function _7(md){return(
md`### Tests`
)}

function _testData(){return(
[
  {foo: 'a',  bar: 1,   baz: true,  date: new Date(2010, 0, 1)},
  {foo: 'b',  bar: 2,   baz: false, date: new Date(2010, 5, 15)},
  {foo: 'c',  bar: -1,  baz: null,  date: new Date(2010, 9, 31)},
  {foo: 'd',  bar: NaN, date: new Date(2010, 2, 10, 13, 45, 23)}
]
)}

function _9(printTable,testData){return(
printTable(testData)
)}

function _10(printTable,testData){return(
printTable(testData, [
  {field: 'foo', title: 'Foo', align: 'l'},
  {field: 'bar', title: 'Bar', align: 'c'},
  {field: 'baz', title: 'Baz', align: 'r'}
])
)}

function _11(printTable,testData){return(
printTable(testData.slice().reverse(), ['baz', 'bar'], '*')
)}

function _12(printTable){return(
printTable(['ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reduce((o,c) => {
  o['column' + c] = 1;
  return o;
}, {})])
)}

function _13(printTable){return(
printTable([{
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet diam quam, in molestie nibh tempor vitae. Proin finibus eget nunc et aliquam. Mauris vulputate et ante id egestas. Praesent finibus metus sed interdum accumsan. Praesent a luctus leo, at vulputate orci. Vivamus sit amet ligula efficitur, gravida nulla eget, pharetra sem. Suspendisse erat nunc, sollicitudin quis rhoncus in, maximus vitae elit. Proin sodales hendrerit cursus.",
  value: 5
}])
)}

function _14(md){return(
md`## printTableTypes`
)}

function _printTableTypes(printTable){return(
function printTableTypes(data, verticalOrientation = true, useRowIndex = 1, maxWidth = 250){
  //debugger;
  const header = (data[0] && Object.keys(data[0]));
  if(useRowIndex < data.length){
    const row = (data[useRowIndex] && Object.values(data[useRowIndex]));
    let types = {};
    for(let i = 0; i < row.length; i++){
      if(row[i] instanceof Date){
        types[header[i]] = "date";
      }else{
        types[header[i]] = typeof(row[i]);
      }
    }

    if(verticalOrientation){
      let listOfFieldsAndTypes = [];
      for(let type in types){
        listOfFieldsAndTypes.push({'field' : type, 'data type' : types[type]});
        console.log(type);
      }
      return printTable(listOfFieldsAndTypes, undefined, maxWidth, false);
    }else{
      return printTable([types], undefined, undefined, false);
    }
  }
}
)}

function _16(md){return(
md`
## mdTable(_data[, header]_)

Print an array of _data_ objects as an HTML-formatted table that uses the width allotted for Markdown output.

The optional _header_ array indicates which fields to include and in what order. The _header_ array values can be either a property name string or an object with the following properties:

- \`field\` - object property name
- \`title\` - [optional] column title to display
- \`align\` - [optional] alignment, one of \`'l'\`, \`'c'\`, or \`'r'\` (left, center, or right).
`
)}

function _mdTable(printTable){return(
function mdTable(data, header) {
  return printTable(data, header, null);
}
)}

function _18(md){return(
md`
## fromColumns(_vectors_)
Generate an array of data objects given input _column_ vectors.
`
)}

function _fromColumns(d3){return(
function fromColumns(vectors) {
  const fields = Object.keys(vectors),
        nrows = d3.max(fields, _ => vectors[_].length),
        data = Array(nrows);
  
  for (let i=0; i<nrows; ++i) {
    data[i] = fields.reduce((o, _) => (o[_] = vectors[_][i], o), {});
  }
  
  return data;
}
)}

function _20(md){return(
md`### Tests`
)}

function _21(mdTable,fromColumns){return(
mdTable(fromColumns({
  u: 'abcdefgh',
  v: [2, 8, 3, 7, 5, 4, 6, 1]
}))
)}

function _22(md){return(
md`## mean(data, field)`
)}

function _mean(){return(
function mean(data, field) {
  // Alternatively, we could use d3's simple stats: https://observablehq.com/@d3/d3-mean-d3-median-and-friends
  // or this lovely simple stats package: http://simple-statistics.github.io/
  // But trying to reduce external dependencies
  const rawNumbers = data.map(item => item[field]);
  const total = rawNumbers.reduce((accumulator, curVal) => accumulator + curVal);
  return total / rawNumbers.length;
}
)}

function _24(md){return(
md`## median(data, field)`
)}

function _median(){return(
function median(data, field) {
  // Alternatively, we could use d3's simple stats: https://observablehq.com/@d3/d3-mean-d3-median-and-friends
  // or this lovely simple stats package: http://simple-statistics.github.io/
  // But trying to reduce external dependencies
  
  // Modified from https://stackoverflow.com/a/53660837
  const rawNumbers = data.map(item => item[field]);
  const sortedNumbers = Array.from(rawNumbers).sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedNumbers.length / 2);

  if (sortedNumbers.length % 2 === 0) {
    return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
  }

  return sortedNumbers[middleIndex];
}
)}

function _26(md){return(
md`## standardDeviation(data, field)`
)}

function _standardDeviation(){return(
function standardDeviation(data, field) {
  // Alternatively, we could use d3's simple stats: https://observablehq.com/@d3/d3-mean-d3-median-and-friends
  // or this lovely simple stats package: http://simple-statistics.github.io/
  // But trying to reduce external dependencies
  
  // Modified from https://stackoverflow.com/a/53577159
  const rawNumbers = data.map(item => item[field]);
  const n = rawNumbers.length
  const mean = rawNumbers.reduce((a, b) => a + b) / n
  return Math.sqrt(rawNumbers.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}
)}

function _28(md){return(
md`## countOccurrencesMap(array, field)`
)}

function _countOccurrencesMap(){return(
function countOccurrencesMap(arr, prop){
  const mapItemToCount = new Map();
  for(const item of arr){
    const key = item[prop];
    if(!mapItemToCount.has(key)){
      mapItemToCount.set(key, 1);
    }else{
      mapItemToCount.set(key, mapItemToCount.get(key) + 1);
    }
  }

  // Sort hashmap by count https://stackoverflow.com/a/61957932/388117
  const sortedMap = new Map([...mapItemToCount.entries()].sort((a,b) => b[1] - a[1]));
  return sortedMap;
}
)}

function _30(md){return(
md`## countOccurrences(array, field)
Counts the occurrences of values for a given field in an object array and returns a sorted count as an array with format: \`[{k:'a'}, {k:'b'}, {k:'c'}, {k:'c'}, {k:'a'}]\``
)}

function _countOccurrences(countOccurrencesMap){return(
function countOccurrences(arr, prop){
  // Sort hashmap by count https://stackoverflow.com/a/61957932/388117
  const sortedMap = countOccurrencesMap(arr, prop);
  let sortedArryCnts = new Array();
  for(const [key, value] of sortedMap.entries()){
    // Use computed property name: https://stackoverflow.com/a/3153983/388117
    sortedArryCnts.push({[prop]: key, count: value});
  }
  return sortedArryCnts;
}
)}

function _32(md){return(
md`### Tests`
)}

function _33(countOccurrences){return(
countOccurrences([{k:'a'}, {k:'b'}, {k:'c'}, {k:'c'}, {k:'a'}], 'k')
)}

function _34(md){return(
md`
## downloadLink(_linkText, file, content[, mimeType]_)
Generate an \`a\` link with a _linkText_ label that downloads _content_ to the _file_ name. The optional _mimeType_ specifies the [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types), which defaults to \`"text/plain"\`.
`
)}

function _downloadLink(html){return(
function downloadLink(label, fileName, content, mimeType) {
  // first, create a content blob
  const blob = new Blob([content], {type: mimeType || 'text/plain'});
  const url = URL.createObjectURL(blob);
  
  // second, create a download link for that blob
  return html`<a href=${url} download="${fileName}">${label}</a>`;
}
)}

function _36(md){return(
md`### Tests`
)}

function _37(downloadLink){return(
downloadLink('Download Dummy Text!', 'dummy.txt', 'dummy')
)}

function _38(md){return(
md`
## unique(_data[, accessor]_)
Return a list of unique values in the _data_ array, optionally applying a provided _accessor_ function to extract values first.
`
)}

function _unique(){return(
function unique(data, accessor) {
  return Array.from(new Set(accessor ? data.map(accessor) : data));
}
)}

function _40(md){return(
md`### Tests`
)}

function _41(unique){return(
unique([1, 2, 1, 2, 3, 3])
)}

function _42(unique){return(
unique([{k:'a'}, {k:'b'}, {k:'c'}, {k:'c'}, {k:'a'}], d => d.k)
)}

function _43(md){return(
md`## uniqueValid(_data[, accessor, insertNull=false]_)
Return a sorted list of unique values in the _data_ array, optionally applying a provided _accessor_ function to extract values first. By default, removes any \`null\`, \`undefined\`, or \`NaN\` values from the unique value set.

If you set _insertNull_ to true, inserts a \`null\` value into the beginning of the array.
`
)}

function _uniqueValid(unique){return(
function uniqueValid(data, accessor, insertNull=false) {
  let newData = unique(data, accessor)
     .filter(d => d != null && d === d)
     .sort((a, b) => a < b ? -1 : a > b ? 1 : 0);

  if(insertNull){
    newData.unshift(null); // add null to beginning of array  
  }
  return newData;
}
)}

function _45(md){return(
md`### Tests`
)}

function _46(uniqueValid){return(
uniqueValid([3, 1, 2, null, undefined, NaN, 1, 2, 3])
)}

function _47(md){return(
md`## Imports`
)}

function _d3(require){return(
require('d3-array')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("printTableTypesHeader")).define("printTableTypesHeader", ["md"], _printTableTypesHeader);
  main.variable(observer("printTableHeader")).define("printTableHeader", ["md"], _printTableHeader);
  main.variable(observer("printTable")).define("printTable", ["width","printValue","html"], _printTable);
  main.variable(observer("printValue")).define("printValue", ["dateString"], _printValue);
  main.variable(observer("dateString")).define("dateString", _dateString);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("testData")).define("testData", _testData);
  main.variable(observer()).define(["printTable","testData"], _9);
  main.variable(observer()).define(["printTable","testData"], _10);
  main.variable(observer()).define(["printTable","testData"], _11);
  main.variable(observer()).define(["printTable"], _12);
  main.variable(observer()).define(["printTable"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("printTableTypes")).define("printTableTypes", ["printTable"], _printTableTypes);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("mdTable")).define("mdTable", ["printTable"], _mdTable);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("fromColumns")).define("fromColumns", ["d3"], _fromColumns);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["mdTable","fromColumns"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("mean")).define("mean", _mean);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("median")).define("median", _median);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("standardDeviation")).define("standardDeviation", _standardDeviation);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("countOccurrencesMap")).define("countOccurrencesMap", _countOccurrencesMap);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("countOccurrences")).define("countOccurrences", ["countOccurrencesMap"], _countOccurrences);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["countOccurrences"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("downloadLink")).define("downloadLink", ["html"], _downloadLink);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["downloadLink"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("unique")).define("unique", _unique);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["unique"], _41);
  main.variable(observer()).define(["unique"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("uniqueValid")).define("uniqueValid", ["unique"], _uniqueValid);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["uniqueValid"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
