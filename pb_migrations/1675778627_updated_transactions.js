migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "35n1ynw3",
    "name": "customer_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "ezqx39gtro3n2m6",
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
    "id": "35n1ynw3",
    "name": "customer",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "ezqx39gtro3n2m6",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
