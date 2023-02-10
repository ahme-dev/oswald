migrate((db) => {
  const collection = new Collection({
    "id": "c8u50fpyjvqul7x",
    "created": "2023-02-06 16:54:11.111Z",
    "updated": "2023-02-06 16:54:11.111Z",
    "name": "products",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oeoh0bz3",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 5,
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
  const collection = dao.findCollectionByNameOrId("c8u50fpyjvqul7x");

  return dao.deleteCollection(collection);
})
