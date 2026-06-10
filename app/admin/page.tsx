import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAllArticles } from "@/lib/articles";
import {
  getFeedbackFromDB,
  getVisitLogsFromDB,
} from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [visits, feedback] = await Promise.all([
    getVisitLogsFromDB(),
    getFeedbackFromDB(),
  ]);

  const articles = getAllArticles();
  const articleTitles = Object.fromEntries(
    articles.map((article) => [article.id, article.titleZh])
  );

  return (
    <AdminDashboard
      visits={visits}
      feedback={feedback}
      articleTitles={articleTitles}
    />
  );
}
