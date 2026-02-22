const test = require('node:test');
const assert = require('node:assert/strict');
const { AuditLogger } = require('../dist/index.js');

test('audit logger records and filters entries', () => {
  const logger = new AuditLogger();
  logger.log({ level: 'info', action: 'login', user: 'yoshi' });
  logger.log({ level: 'warn', action: 'login', user: 'admin' });
  assert.equal(logger.getAll().length, 2);
  assert.equal(logger.getByAction('login').length, 2);
  assert.equal(logger.getByUser('yoshi').length, 1);
});
