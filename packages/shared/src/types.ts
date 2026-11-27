export interface TaskDTO {
  id: string;
  projectId: string;
  title: string;
  status: string;
  assigneeId: string | null;
  estimateHours: number;
}

export interface ProjectDTO {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  budget: number;
  currency: string;
  isArchived: boolean;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface CommentDTO {
  id: string;
  taskId: string;
  authorId: string;
  body: string;
}

export interface TeamDTO {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  memberIds: string[];
}
