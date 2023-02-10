migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bdr4sjne",
    "name": "price_current",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 250,
      "max": 100000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bdr4sjne",
    "name": "price_current",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 3,
      "max": 100
    }
  }))

  return dao.saveCollection(collection)
})
