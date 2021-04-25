'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('name', 100).nullable()
      table.integer('created_by').nullable()
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.dateTime('updated_at')
      table.integer('updated_by').nullable()
      table.integer('delete_flag').comment('0 = Existing \n 1 = Deleted').defaultTo(0)
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
