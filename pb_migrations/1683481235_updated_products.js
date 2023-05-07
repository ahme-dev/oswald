migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  collection.listRule = "@request.auth.permit ~ \"cashier\" || @request.auth.permit ~ \"inventory\" || @request.auth.permit ~ \"manager\""
  collection.viewRule = "@request.auth.permit ~ \"cashier\" || @request.auth.permit ~ \"inventory\" || @request.auth.permit ~ \"manager\""
  collection.createRule = "@request.auth.permit ~ \"inventory\" || @request.auth.permit ~ \"manager\""
  collection.updateRule = "@request.auth.permit ~ \"inventory\" || @request.auth.permit ~ \"manager\""

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
