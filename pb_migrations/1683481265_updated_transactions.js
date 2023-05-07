migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m")

  collection.listRule = "@request.auth.permit ~ \"cashier\" || @request.auth.permit ~ \"manager\""
  collection.viewRule = "@request.auth.permit ~ \"cashier\" || @request.auth.permit ~ \"manager\""
  collection.createRule = "@request.auth.permit ~ \"cashier\" || @request.auth.permit ~ \"manager\""
  collection.updateRule = "@request.auth.permit ~ \"cashier\" || @request.auth.permit ~ \"manager\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
