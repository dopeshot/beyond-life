db.users.insertOne(
    {
        _id: ObjectId("64cb73dd6e746811d8e5bbde"),
        email: "devops@totally.rocks",
        password: "$2b$10$vCZrO9z18.xnQM.6ltSakOZWbNriN9U6983rswwMzyBCwmafQWqGm",
        createdAt: new Date(),
        hasVerifiedEmail: false,
        paymentPlan: "single",
        checkoutInformation: {
            status: "paid",
            lastInformationTime: 1691157223
        },
        __v: 0,
        lastLogin: new Date(),
        stripeCustomerId: "cus_OOAnQW5ksqkqoO"
    }
)

db.lastwills.insertOne(
    {
        _id: ObjectId("64cd019d9967569b24799ea7"),
        accountId: "64cb73dd6e746811d8e5bbde",
        common: {},
        testator: {
            name: "Peter Lustig",
            gender: "male",
            birthDate: "2000-01-05",
            birthPlace: "Lustige Stadt",
            isHandicapped: false,
            isInsolvent: false,
            address: {
                street: "Lustigerweg",
                houseNumber: "12",
                zipCode: "3141124",
                city: "Lustige Stadt"
            },
            relationshipStatus: "unmarried"
        },
        heirs: [
            {
                id: "3Ih7qT_adVfcnG5b9jzDQ",
                type: "mother",
                name: "Petra Lustig",
                gender: "male",
                birthDate: "1900-05-05",
                birthPlace: "Lustige Stadt",
                isHandicapped: false,
                isInsolvent: false,
                address: {
                    street: "Lustigerweg",
                    houseNumber: "1323",
                    zipCode: "12412412",
                    city: "Lustiger Ort"
                },
                itemIds: [
                    "wEXKBvCgte_6CBDaCsN4d",
                    "FLahqIRgrGqsGO8v23SGF"
                ],
                percentage: 33
            },
            {
                id: "giYKNXLDW_c8Fhb1x6n0_",
                type: "father",
                name: "Peta Lustig",
                gender: "male",
                birthDate: "1900-05-05",
                birthPlace: "Lustiger Ort",
                isHandicapped: false,
                isInsolvent: false,
                address: {
                    street: "Lustige Straße",
                    houseNumber: "2312",
                    zipCode: "12412412",
                    city: "Lustiges Dorf"
                },
                itemIds: [],
                percentage: 33
            },
            {
                id: "yICCdYJx4UweOAW5O4yjx",
                type: "organisation",
                name: "RTL 2",
                address: {
                    city: "Bielefeld",
                    houseNumber: "412",
                    zipCode: "2312451",
                    street: "RTLStraße"
                },
                itemIds: [],
                percentage: 33
            }
        ],
        items: [
            {
                id: "wEXKBvCgte_6CBDaCsN4d",
                name: "Goldbarren",
                description: "schnell verkaufen"
            },
            {
                id: "FLahqIRgrGqsGO8v23SGF",
                name: "Silberbesteck",
                description: "nicht verkaufen"
            }
        ],
        financialAssets: [
            {
                id: "20jEwA5rcFcykCLAMKC01",
                where: "Sparkasse",
                amount: 69000,
                currency: "€"
            }
        ],
        progressKeys: [
            "testator",
            "marriage",
            "heirs",
            "inheritance",
            "succession"
        ],
        __v: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    }
)