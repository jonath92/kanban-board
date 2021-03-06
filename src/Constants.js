export const CATEGORIES = [
    "Do Today", "Backlog", "Keep Track", "Ideas"
]

export const SAMPLE_TASKS = [
    {
        "category": CATEGORIES[0],
        "title": "Have Fun",
        "description": "Swimming or going to the cinema?",
    },
    {
        "category": CATEGORIES[1],
        "title": "Learn Typescript",
        "description": 'Good getting started guide: https://create-react-app.dev/docs/adding-typescript/',

    },
    {
        "category": CATEGORIES[2],
        "title": "Ordered a new Smartphone online",
        "description": "Should arrive tomorrow",
    },
    {
        "category": CATEGORIES[3],
        "title": "Migrate to Nextcloud"
    }
]

export const LOCAL_STORAGE_NAMESPACE = 'todo-board'

// This is needed for React DND. IMHO it is totaly useless when there is only one draggable type
export const DROP_ITEM_TYP = "card"