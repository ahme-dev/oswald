migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ezqx39gtro3n2m6")

  collection.listRule = "@request.auth.role = \"cashier\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ezqx39gtro3n2m6")

  collection.listRule = null

  return dao.saveCollection(collection)
})
