migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oeoh0bz3",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": 5,
      "max": 50,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oeoh0bz3",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 5,
      "max": 50,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
