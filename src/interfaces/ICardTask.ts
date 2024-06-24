interface User {
    id: number;
    username: string;
    passwordHash: string;
}

interface Status {
    id: number;
    statusName: string;
}

interface Priority {
    id: number;
    priorityName: string;
}

interface Category {
    id: number;
    categoryName: string;
    userID: number;
    user: User;
}

interface Tag {
    id: number;
    tagName: string;
    taskTags: string[];
}

interface TaskTag {
    taskID: number;
    task: string;
    tagID: number;
    tag: Tag;
}

interface Task {
    id?: number;
    title?: string;
    description?: string;
    creationDate?: string;
    completionDate?: string;
    statusID?: number;
    status?: Status;
    priorityID?: number;
    priority?: Priority;
    userID?: number;
    user?: User;
    categoryID?: number;
    category?: Category;
    taskTags?: TaskTag[];
}
export default Task;