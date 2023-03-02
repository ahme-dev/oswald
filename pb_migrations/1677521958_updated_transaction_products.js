migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jr530dc81onwr0b")

  // remove
  collection.schema.removeField("epsx1p2m")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jr530dc81onwr0b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "epsx1p2m",
    "name": "transaction_ids",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "5limayfs4of4l2m",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
