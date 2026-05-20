import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/30 p-6">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <p className="text-7xl font-semibold tracking-tight text-muted-foreground/40">
          404
        </p>
        <h1 className="text-2xl font-semibold">{t("notFound.title")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("notFound.description")}
        </p>
        <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
          <Link to="/">{t("notFound.back")}</Link>
        </Button>
      </div>
    </div>
  );
}
