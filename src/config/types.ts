export interface PostMatter {
  title: string;
  date: string;
  desc: string;
  thumbnail: string;
}

export interface Post extends PostMatter {
  url: string;
  slug: string;
  category: string;
  content: string;
  readingMinutes: number;
  dateString: string;
}

export interface CategoryDetail {
  dirName: string;
  publicName: string;
  count: number;
}
