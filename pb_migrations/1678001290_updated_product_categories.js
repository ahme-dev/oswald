migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g0i4xfg4q04tejw")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g0i4xfg4q04tejw")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
