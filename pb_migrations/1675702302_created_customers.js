migrate((db) => {
  const collection = new Collection({
    "id": "ezqx39gtro3n2m6",
    "created": "2023-02-06 16:51:41.987Z",
    "updated": "2023-02-06 16:51:41.987Z",
    "name": "customers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tcusszy2",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": 100,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "l82n35pl",
        "name": "phone",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 11,
          "max": 11
        }
      },
      {
        "system": false,
        "id": "qgnlov3s",
        "name": "field",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
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
  const collection = dao.findCollectionByNameOrId("ezqx39gtro3n2m6");

  return dao.deleteCollection(collection);
})
