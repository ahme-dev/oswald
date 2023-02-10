migrate((db) => {
  const collection = new Collection({
    "id": "5limayfs4of4l2m",
    "created": "2023-02-06 17:50:59.887Z",
    "updated": "2023-02-06 17:50:59.887Z",
    "name": "sales",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yac9za1s",
        "name": "date",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "35n1ynw3",
        "name": "customer",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "ezqx39gtro3n2m6",
          "cascadeDelete": false
        }
      },
      {
        "system": false,
        "id": "esqnders",
        "name": "products",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": null,
          "collectionId": "c8u50fpyjvqul7x",
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
  const collection = dao.findCollectionByNameOrId("5limayfs4of4l2m");

  return dao.deleteCollection(collection);
})
