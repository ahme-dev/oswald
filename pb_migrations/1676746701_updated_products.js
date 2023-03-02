migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = ""

  return dao.saveCollection(collection)
})
