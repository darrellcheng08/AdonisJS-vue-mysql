'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name')
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('api_token', 245).nullable()
      table.timestamp('email_verified_at').nullable()
      table.integer('created_by').nullable()
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.dateTime('updated_at')
      table.integer('updated_by').nullable()
      table.integer('delete_flag').comment('0 = Existing \n 1 = Deleted').defaultTo(0)
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
