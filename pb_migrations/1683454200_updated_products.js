migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  collection.listRule = "@request.auth.permit = \"cashier\""
  collection.viewRule = "@request.auth.permit = \"cashier\""
  collection.createRule = "@request.auth.permit = \"inventory\""
  collection.updateRule = "@request.auth.permit = \"inventory\""
  collection.deleteRule = "@request.auth.permit = \"inventory\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
