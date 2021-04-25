'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductImagesSchema extends Schema {
  up () {
    this.create('product_images', (table) => {
      table.increments()
      table.integer('product_id').nullable()
      table.text('image_url').nullable()
      table.integer('created_by').nullable()
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.dateTime('updated_at')
      table.integer('updated_by').nullable()
      table.integer('delete_flag').comment('0 = Existing \n 1 = Deleted').defaultTo(0)
    })
  }

  down () {
    this.drop('product_images')
  }
}

module.exports = ProductImagesSchema
