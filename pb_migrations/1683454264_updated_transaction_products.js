migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jr530dc81onwr0b")

  collection.listRule = "@request.auth.permit = \"cashier\""
  collection.viewRule = "@request.auth.permit = \"cashier\""
  collection.createRule = "@request.auth.permit = \"cashier\""
  collection.updateRule = "@request.auth.permit = \"cashier\""
  collection.deleteRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jr530dc81onwr0b")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = ""

  return dao.saveCollection(collection)
})
