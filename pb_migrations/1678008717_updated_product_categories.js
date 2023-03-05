migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g0i4xfg4q04tejw")

  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g0i4xfg4q04tejw")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
