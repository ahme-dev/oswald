migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
