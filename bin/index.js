#! /usr/bin/env node

const Bossy = require('bossy');
const HttpStatus = require('http-status');

const definition = {
  h: {
    description: 'Show help',
    alias: 'help',
    type: 'boolean'
  }
};

const args = Bossy.parse(definition);

if (args instanceof Error) {
  console.error(args.message);
  process.exit(1);
}

if (args.h) {
  console.log(Bossy.usage(definition, 'http <http status code>'));
  process.exit(0);
}

if (args._) {
  const statusCode = args._[0];
  if (!isNaN(statusCode)) {
    console.log(`${statusCode}: ${HttpStatus[statusCode]}`);
  }
} else {
  for(var prop in HttpStatus) {
    if (!isNaN(prop)) {
      console.log(`${prop}: ${HttpStatus[prop]}`);
    }
  }
}
