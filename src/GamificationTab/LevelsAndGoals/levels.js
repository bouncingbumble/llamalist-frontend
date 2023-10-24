export default [
    [
        {
            title: () => 'Add three tasks',
            isCompleted: (user) => (user.tasks.length > 2 ? true : false),
        },
        {
            title: () => 'Complete three tasks',
            isCompleted: () => {
                return false
            },
        },
        {
            title: () => 'Play the mini game by clicking on the llama',
            isCompleted: () => {
                return false
            },
        },
    ],
    [
        {
            title: () => 'Text in a task',
            isCompleted: () => {
                return false
            },
        },
        {
            title: () => 'Complete ten tasks',
            isCompleted: () => {
                return false
            },
        },
        {
            title: (name) =>
                `Buy ${name} their first accessory in the apple orchard emporium`,
            isCompleted: () => {
                return false
            },
        },
    ],
    [
        {
            title: () => 'Email in a task',
            isCompleted: () => {
                return false
            },
        },
        {
            title: () => 'Score over 10,000 in the llama game',
            isCompleted: () => {
                return false
            },
        },
        {
            title: () => 'Create fifteen tasks',
            isCompleted: () => {
                return false
            },
        },
    ],
    [
        {
            title: () => 'Thow an apple at a friend',
            isCompleted: () => {
                return false
            },
        },
        {
            title: () => 'Get a three day streak',
            isCompleted: () => {
                return false
            },
        },
        {
            title: (name) => `Feed ${name} an extra apple today`,
            isCompleted: () => {
                return false
            },
        },
    ],
    [
        {
            title: (name) => `Take ${name} to space`,
            isCompleted: () => {
                return false
            },
        },
        {
            title: () => 'Complete 25 tasks',
            isCompleted: () => {
                return false
            },
        },
        {
            title: (name) => `Score over 25,000 on the llama game`,
            isCompleted: () => {
                return false
            },
        },
    ],
    [
        {
            title: (name) => `Buy ${name} another accessory`,
            isCompleted: () => {
                return false
            },
        },
        {
            title: () => 'Get a 5 day streak',
            isCompleted: () => {
                return false
            },
        },
        {
            title: (name) => `Find this week's golden llama`,
            isCompleted: () => {
                return false
            },
        },
    ],
]
