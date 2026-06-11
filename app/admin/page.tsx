import AdminDashboard from "@/components/admin/AdminDashboard";
import {
  getArticlesFromDB,
  getFeedbackFromDB,
  getVisitLogsFromDB,
} from "@/lib/storage";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [visits, feedback, articles] = await Promise.all([
    getVisitLogsFromDB(),
    getFeedbackFromDB(),
    getArticlesFromDB(),
  ]);
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
