import Link from "next/link";
import Layout from "../components/Layout";
import { getPostsData } from "../lib/posts";
import styles from "../styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";

// SSGの場合
export async function getStaticProps() {
	const allPostsData = getPostsData(); // id, title, date, thumbnail
	console.log(allPostsData);

	return {
		props: {
			allPostsData,
		},
	};
}

export default function Home({ allPostsData }) {
	return (
		<Layout>
			<section className={utilStyle.headingMd}>
				<p>私はフロントエンドエンジニアです。Next.jsが大好きです。</p>
			</section>

			<section
				className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}
			>
				<h2>📝エンジニアのブログ</h2>
				<div className={styles.grid}>
					{allPostsData.map(({ id, title, date, thumbnail }) => (
						<article key={id}>
							<Link href={`/posts/${id}`}>
								<img
									src={`${thumbnail}`}
									className={styles.thumbnailImage}
								/>
							</Link>
							<Link
								href={`/posts/${id}`}
								className={utilStyle.boldText}
							>
								{title}
							</Link>
							<br />
							<small className={utilStyle.lightText}>
								{date}
							</small>
						</article>
					))}
				</div>
			</section>
		</Layout>
	);
}
