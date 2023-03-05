migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jr530dc81onwr0b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "plcyfzvs",
    "name": "price_sold",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 250,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jr530dc81onwr0b")

  // remove
  collection.schema.removeField("plcyfzvs")

  return dao.saveCollection(collection)
})
