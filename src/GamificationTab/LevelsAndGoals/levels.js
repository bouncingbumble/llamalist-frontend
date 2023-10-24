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
            title: () => 'Lorem ipsum dolor sit amet',
            isCompleted: () => {
                return false
            },
        },
        {
            title: () => 'Lorem ipsum dolor sit amet consectetur adipisicing.',
            isCompleted: () => {
                return false
            },
        },
        {
            title: () => 'Lorem ipsum dolor sit amet consectetur.',
            isCompleted: () => {
                return false
            },
        },
    ],
]
