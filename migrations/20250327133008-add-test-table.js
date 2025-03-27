'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  const query = `
    CREATE TABLE message (
      message_uuid UUID NOT NULL PRIMARY KEY,
      message TEXT NOT NULL
    );
  `;
  return db.runSql(query);
};

exports.down = function (db) {
  const query = `
    DROP TABLE message;
  `;
  return db.runSql(query);
};

exports._meta = {
  version: 1,
};
