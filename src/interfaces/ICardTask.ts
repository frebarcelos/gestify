interface User {
    id: number;
    username: string;
    passwordHash: string;
}

export interface Status {
    id: number;
    statusName: string;
}

interface Priority {
    id: number;
    priorityName: string;
}

export interface ICategory {
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

export interface ITask {
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
    category?: ICategory;
    taskTags?: TaskTag[];
}
;