export const CATEGORIES = [
    "DO TODAY", "BACKLOG", "KEEP TRACK", "IDEAS"
]

export const SAMPLE_TASKS = [
    {
        "category": CATEGORIES[0],
        "title": "Make Homework",
        "id": "c1d9c8c5-8273-4723-bb2f-6ab0a8abb979"
    },
    {
        "category": CATEGORIES[0],
        "title": "Have Fun",
        "description": "Swimming or going to the cinema?",
        "id": "6fc7709c-198c-4103-8712-d3bfab106862"
    },
    {
        "category": CATEGORIES[0],
        "title": "Make Homework",
        "id": "c5d9c8c5-8273-4723-bb2f-6ab0a8abb979"
    },
    {
        "category": CATEGORIES[0],
        "title": "Have Fun",
        "description": "Swimming or going to the cinema?",
        "id": "68fc7709c-198c-4103-8712-d3bfab106862"
    }
]

export const LOCAL_STORAGE_PREFIX = 'todo-board'

// This is needed for React DND. IMHO it is totaly useless when there is only one draggable type
export const DROP_ITEM_TYP = "card"