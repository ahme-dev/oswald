migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "esqnders",
    "name": "transaction_product_ids",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "jr530dc81onwr0b",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "esqnders",
    "name": "transaction_product_ids",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "c8u50fpyjvqul7x",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
