import type { ReactNode } from "react";
import { Construction } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

interface PlaceholderProps {
  titleKey: string;
  subtitleKey: string;
  actions?: ReactNode;
}

export function Placeholder({
  titleKey,
  subtitleKey,
  actions,
}: PlaceholderProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <PageHeader
        title={t(titleKey)}
        description={t(subtitleKey)}
        actions={actions}
      />
      <EmptyState
        icon={<Construction className="h-5 w-5" />}
        title={t("common.comingSoon")}
        description={t("common.comingSoonDescription")}
      />
    </div>
  );
}
