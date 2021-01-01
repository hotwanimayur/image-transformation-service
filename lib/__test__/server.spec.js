const winston = require('winston');
const express = require('express');

const { createServer } = require('../server');

describe('createServer', () => {
  it('creates a server', () => {
    const nullLogger = winston.createLogger();
    expect(createServer({ logger: nullLogger })).toBeTruthy();
  });

  it('throws if not provided a logger', () => {
    expect(() => createServer()).toThrowError();
  })
});
