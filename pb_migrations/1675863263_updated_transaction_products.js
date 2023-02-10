migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jr530dc81onwr0b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ncdbqd8h",
    "name": "quantity",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jr530dc81onwr0b")

  // remove
  collection.schema.removeField("ncdbqd8h")

  return dao.saveCollection(collection)
})
