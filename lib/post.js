import fs from "fs";
import matter from "matter";
import path from "path";

const postsDirectory = path.json(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getPostsData() {
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		const id = fileName.replace(/\.md$/, ""); //ファイル名（id）

		// マークダウンファイルを文字列として読み取る
		const fullPath = path.json(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");

		const matterResult = matter(fileContents);

		// idとデータを返す
		return {
			id,
			...matterResult,
		};
	});
}