console.log("starting")

db = new Mongo().getDB("testDB");

console.log("running")

db.createCollection('users', { capped: false })

console.log("exporting")

// WeAllLoveDevOps
db.users.insert([
    {
        "_id": {
            "$oid": "64cb73dd6e746811d8e5bbde"
        },
        "email": "devops@totally.rocks",
        "password": "$2b$10$vCZrO9z18.xnQM.6ltSakOZWbNriN9U6983rswwMzyBCwmafQWqGm",
        "createdAt": {
            "$date": "2023-08-03T09:31:09.315Z"
        },
        "hasVerifiedEmail": false,
        "paymentPlan": "free",
        "checkoutInformation": {
            "status": "free",
            "lastInformationTime": 0
        },
        "__v": 0,
        "lastLogin": {
            "$date": "2023-08-03T09:31:09.372Z"
        }
    }])