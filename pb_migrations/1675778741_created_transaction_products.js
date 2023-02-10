migrate((db) => {
  const collection = new Collection({
    "id": "jr530dc81onwr0b",
    "created": "2023-02-07 14:05:41.860Z",
    "updated": "2023-02-07 14:05:41.860Z",
    "name": "transaction_products",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jgftxncg",
        "name": "product_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "c8u50fpyjvqul7x",
          "cascadeDelete": false
        }
      },
      {
        "system": false,
        "id": "epsx1p2m",
        "name": "transaction_ids",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": null,
          "collectionId": "5limayfs4of4l2m",
          "cascadeDelete": false
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jr530dc81onwr0b");

  return dao.deleteCollection(collection);
})
