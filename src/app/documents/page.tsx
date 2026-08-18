import { DocumentLibrary } from "@/components/organisms/DocumentLibrary";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";

export default function DocumentsPage() {
  return (
    <DashboardTemplate
      title="参照資料"
      description="検索に使用する施工記録と見積書を管理します。"
    >
      <DocumentLibrary />
    </DashboardTemplate>
  );
}
