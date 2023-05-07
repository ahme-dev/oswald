migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g0i4xfg4q04tejw")

  collection.listRule = "@request.auth.permit ~ \"cashier\" || @request.auth.permit ~ \"inventory\""
  collection.viewRule = "@request.auth.permit ~ \"cashier\" || @request.auth.permit ~ \"inventory\""
  collection.createRule = "@request.auth.permit ~ \"inventory\""
  collection.updateRule = "@request.auth.permit ~ \"inventory\""
  collection.deleteRule = "@request.auth.permit ~ \"inventory\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g0i4xfg4q04tejw")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
