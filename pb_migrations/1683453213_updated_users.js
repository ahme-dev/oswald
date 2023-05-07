migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "blerzmjn",
    "name": "permit",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 3,
      "values": [
        "cashier",
        "inventory",
        "manager"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("blerzmjn")

  return dao.saveCollection(collection)
})
