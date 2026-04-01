export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'Computer Vision' | 'Generative AI' | string;
  image: string;
  detailImage?: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  metrics?: { label: string; value: string }[];
  architecture?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'work' | 'education' | 'project';
}
