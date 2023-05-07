migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m")

  collection.listRule = "@request.auth.permit ~ \"cashier\""
  collection.viewRule = "@request.auth.permit ~ \"cashier\""
  collection.createRule = "@request.auth.permit ~ \"cashier\""
  collection.updateRule = "@request.auth.permit ~ \"cashier\""

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
