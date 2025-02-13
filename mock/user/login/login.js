/**
 * 移动首页
 *
 * @url /login
 *
 * POST: Request method and parameter
 *   uid This is the requested userID
 *
 * Here you can write a detailed description
 * of the parameters of the information.
 */

module.exports = (req) => {
  // var uid = req.query.uid;
  //
  // if (!uid) {
  //   return {
  //     code: -1,
  //     msg: 'no uid',
  //   }
  // }
  return {
    "status": "success",
    "result": {
      "id": 18,
      "name": "123",
      "mobile": "13818952288",
      "created_at": "2020-03-20 17:41:52",
      "updated_at": "2020-04-09 17:50:23",
      "status": 1,
      "enterprise_id": 13,
      "dept_id": 7,
      "is_bind": 1,
      "unbind_datetime": null,
      "email": "13818952288@qq.com",
      "is_admin": 1,
      "leave_datetime": null,
      "deleted_at": null,
      "key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTh9.gaOl49XI7bTmMwJ1KMWfN75Exyt9YdYel2tvsS2DOsM",
      "permissions": [
        {
          "id": 1,
          "parent_id": null,
          "match": "roles"
        },
        {
          "id": 2,
          "parent_id": 1,
          "match": "roles/list"
        },
        {
          "id": 3,
          "parent_id": 1,
          "match": "roles/userList"
        },
        {
          "id": 4,
          "parent_id": null,
          "match": "role_add_edit"
        }
      ]
    }
  }
};
