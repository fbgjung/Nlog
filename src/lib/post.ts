import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CategoryDetail, Post, PostMatter } from "@/config/types";
import readingTime from "reading-time";
import dayjs from "dayjs";
import { sync } from "glob";

const BASE_PATH = "src/posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

/* 🐯 MDX 파일 관련 함수 */

// 모든 MDX 파일 조회
export const getPostPaths = (category?: string) => {
  const folder = category || "**";
  const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
  return postPaths;
};

// MDX 파싱: abstract / detail 구분
const parsePost = async (postPath: string): Promise<Post> => {
  const postAbstract = parsePostAbstract(postPath);
  const postDetail = parsePostDetail(postPath);

  return {
    ...postAbstract,
    ...postDetail,
  };
};

// MDX abstract 파싱 - 목록 페이지
export const parsePostAbstract = (postPath: string) => {
  const filePath = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, "")
    .replace(".mdx", "");

  const [category, slug] = filePath.split("/");

  const url = `/blog/${category}/${slug}`;

  return { url, category, slug };
};

// MDX detail 파싱 - 상세 페이지
export const parsePostDetail = (postPath: string) => {
  const filePath = postPath.endsWith(".mdx")
    ? postPath
    : path.join(postPath, "content.mdx");
  const file = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(file);
  const grayMatter = data as PostMatter;
  const readingMinutes = Math.ceil(readingTime(content).minutes);
  const date = new Date(grayMatter.date).toISOString();
  const dateString = dayjs(grayMatter.date)
    .locale("ko")
    .format("YYYY년 MM월 DD일");
  return { ...grayMatter, date, dateString, content, readingMinutes };
};

/* 🐯 post 최신순 정렬 조회 */
const sortPostList = (PostList: Post[]) => {
  return PostList.sort((a, b) => (a.date > b.date ? -1 : 1));
};

export const getPostList = async (category?: string): Promise<Post[]> => {
  const postPaths = getPostPaths(category);
  const postList = await Promise.all(
    postPaths.map((postPath) => parsePost(postPath))
  );
  return postList;
};

export const getSortedPostList = async (category?: string) => {
  const postList = await getPostList(category);
  return sortPostList(postList);
};

/* 🐯 category 목록 조회 */
export const getCategoryList = async () => {
  const postPaths = getPostPaths();
  const categoryList = postPaths.map((postPath) => postPath.split("/")[0]);
  return categoryList;
};

/* 🐯 카테고리별 포스트 수 계산 */

// category 폴더명 변경 : dir_name -> Dir Name
export const getCategoryPublicName = (dirPath: string) =>
  dirPath
    .split("_")
    .map((token) => token[0].toUpperCase() + token.slice(1, token.length))
    .join(" ");

export const getCategoryDetailList = async () => {
  const postList = await getPostList();
  const result: { [key: string]: number } = {};
  for (const post of postList) {
    const category = post.category;
    result[category] = (result[category] || 0) + 1;
  }
  const detailList: CategoryDetail[] = Object.entries(result).map(
    ([category, count]) => ({
      dirName: category,
      publicName: getCategoryPublicName(category),
      count,
    })
  );

  return detailList;
};

/* 🐯 post 상세 페이지 내용 조회 */
export const getPostDetail = async (category: string, slug: string) => {
  const filePath = `${POSTS_PATH}/${category}/${slug}/content.mdx`;
  const detail = await parsePost(filePath);
  return detail;
};
