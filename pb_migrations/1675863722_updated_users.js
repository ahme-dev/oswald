migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("4fofvfsi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v1rrlud9",
    "name": "role",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4fofvfsi",
    "name": "is_admin",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("v1rrlud9")

  return dao.saveCollection(collection)
})
