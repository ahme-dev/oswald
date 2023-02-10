migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  // add
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

  // add
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t6x3o4iq",
    "name": "about",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 5,
      "max": 152,
      "pattern": ""
    }
  }))

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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  // remove
  collection.schema.removeField("bdr4sjne")

  // remove
  collection.schema.removeField("8qaospd4")

  // remove
  collection.schema.removeField("t6x3o4iq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oeoh0bz3",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 5,
      "max": 50,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
