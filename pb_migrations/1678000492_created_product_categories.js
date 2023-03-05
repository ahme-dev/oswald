migrate((db) => {
  const collection = new Collection({
    "id": "g0i4xfg4q04tejw",
    "created": "2023-03-05 07:14:52.214Z",
    "updated": "2023-03-05 07:14:52.214Z",
    "name": "product_categories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jr9uhu8a",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": 3,
          "max": 50,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("g0i4xfg4q04tejw");

  return dao.deleteCollection(collection);
})
