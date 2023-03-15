migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m")

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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wdxwbfii",
    "name": "refund",
    "type": "bool",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
