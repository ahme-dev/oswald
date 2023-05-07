migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g0i4xfg4q04tejw")

  collection.listRule = "@request.auth.permit ~ \"cashier\" || @request.auth.permit ~ \"inventory\" || @request.auth.permit ~ \"manager\""
  collection.viewRule = "@request.auth.permit ~ \"cashier\" || @request.auth.permit ~ \"inventory\" || @request.auth.permit ~ \"manager\""
  collection.createRule = "@request.auth.permit ~ \"inventory\" || @request.auth.permit ~ \"manager\""
  collection.updateRule = "@request.auth.permit ~ \"inventory\" || @request.auth.permit ~ \"manager\""
  collection.deleteRule = "@request.auth.permit ~ \"inventory\" || @request.auth.permit ~ \"manager\""

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
