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
      "min": 3,
      "max": 100
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8qaospd4",
    "name": "quantity_available",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
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
    "name": "price",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 3,
      "max": 100
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8qaospd4",
    "name": "quantity",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
