#! /usr/bin/env node

require('dcp-client').initSync();
const compute = require('dcp/compute');

const string_to_change = "hello, qhacks!";

/* Define Work Function - no closures! */
function workFn(letter) {
  progress(); /* every work function must call progress at least once and at least once every 30s */
  return letter.toUpperCase();
}

/* Declare job handle, associate input set with work function */
let inputSet = Array.from(string_to_change);
let job = compute.for(inputSet, workFn);

/* Wire Up Some Events */
job.on('readystatechange', (ev) => console.log('Ready State:', ev));
job.on('result',           (ev) => console.log('Received result:', ev.result));

/* Launch job, await result */
job.exec().then((resultSet) => {
  /* Output results */
  let allCaps = Array.from(resultSet).join('');
  console.log(allCaps);
});