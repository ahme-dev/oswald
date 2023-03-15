migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "clyean83",
    "name": "wasRefunded",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wdxwbfii",
    "name": "isRefund",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m")

  // remove
  collection.schema.removeField("clyean83")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wdxwbfii",
    "name": "refund",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
