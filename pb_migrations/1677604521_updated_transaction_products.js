migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jr530dc81onwr0b")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jr530dc81onwr0b")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
