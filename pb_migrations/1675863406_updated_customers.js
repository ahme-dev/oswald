migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ezqx39gtro3n2m6")

  // remove
  collection.schema.removeField("l82n35pl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jlgnskah",
    "name": "phone",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": 11,
      "max": 11,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ezqx39gtro3n2m6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l82n35pl",
    "name": "phone",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 11,
      "max": 11
    }
  }))

  // remove
  collection.schema.removeField("jlgnskah")

  return dao.saveCollection(collection)
})
