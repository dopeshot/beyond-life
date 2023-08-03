db.users.insertOne(
    {
        _id: ObjectId("64cb73dd6e746811d8e5bbde"),
        email: "devops@totally.rocks",
        password: "$2b$10$vCZrO9z18.xnQM.6ltSakOZWbNriN9U6983rswwMzyBCwmafQWqGm",
        createdAt: new Date(),
        hasVerifiedEmail: false,
        paymentPlan: "free",
        checkoutInformation: {
            status: "free",
            lastInformationTime: 0
        },
        __v: 0,
        lastLogin: new Date()
    }
)

