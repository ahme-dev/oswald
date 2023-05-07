migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  collection.listRule = "@request.auth.permit ~ \"cashier\" || @request.auth.permit ~ \"inventory\""
  collection.viewRule = "@request.auth.permit ~ \"cashier\" || @request.auth.permit ~ \"inventory\""
  collection.createRule = "@request.auth.permit ~ \"inventory\""
  collection.updateRule = "@request.auth.permit ~ \"inventory\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
