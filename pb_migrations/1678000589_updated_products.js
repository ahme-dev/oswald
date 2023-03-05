migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "439k4a86",
    "name": "category",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "g0i4xfg4q04tejw",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  // remove
  collection.schema.removeField("439k4a86")

  return dao.saveCollection(collection)
})
