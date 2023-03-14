import shortid from 'shortid'

export const projectsData = [
    {
        id: shortid.generate(),
        subject: 'Project 1',
        done: false,
        tasks: [
            {
                id: shortid.generate(),
                subject: 'Task 1',
                done: false
            },
            {
                id: shortid.generate(),
                subject: 'Task 2',
                done: false
            }
        ]
    },
    {
        id: shortid.generate(),
        subject: 'Project 2',
        done: false,
        tasks: [
            {
                id: shortid.generate(),
                subject: 'Task 1',
                done: false
            },
            {
                id: shortid.generate(),
                subject: 'Task 2',
                done: false
            }
        ]
    }
]

export const tasksData = [
    {
        id: shortid.generate(),
        subject: 'Task 1',
        done: false
    },
    {
        id: shortid.generate(),
        subject: 'Task 2',
        done: false
    }
]