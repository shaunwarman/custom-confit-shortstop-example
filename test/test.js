const Confit = require('confit');
const Shortstop = require('shortstop');
const Test = require('tape');

const json = require('./fixtures/env');

const resolver = Shortstop.create();

resolver.use('env_true', (val) => {
  if (!process.env[val]) {
    return true;
  }
  return process.env[val];
});

Test('shorstop', t => {

  t.test('env default to true', t => {

    resolver.resolve(json, function (err, data) {
      t.equals(data.logger.enabled, true);
      t.end();
    });

  });

  t.test('env value exists', t => {

    process.env['SOME_ENV_VAR'] = 'testing';

    resolver.resolve(json, function (err, data) {
      t.equals(data.logger.enabled, 'testing');
      t.end();
    });

  });


});
