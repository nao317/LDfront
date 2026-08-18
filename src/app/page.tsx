import { SearchWorkspace } from "@/components/organisms/SearchWorkspace";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";

export default function HomePage() {
  return (
    <DashboardTemplate
      title="見積もり検索"
      description="過去の施工資料から、条件に近い事例を検索します。"
    >
      <SearchWorkspace />
    </DashboardTemplate>
  );
}
