migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
