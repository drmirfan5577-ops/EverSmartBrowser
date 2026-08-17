import BismillahBanner from "@/components/features/BismillahBanner";
import SearchBar from "@/components/features/SearchBar";
import IconGrid from "@/components/features/IconGrid";
import { ALL_ICONS } from "@/data/icons";
import type { Theme, Language, AppIcon } from "@/types";

interface HomeTabProps {
  theme: Theme;
  lang: Language;
  onIconPress: (icon: AppIcon) => void;
}

export default function HomeTab({ theme, lang, onIconPress }: HomeTabProps) {
  return (
    <div>
      <BismillahBanner theme={theme} lang={lang} />
      <SearchBar theme={theme} lang={lang} />
      <IconGrid icons={ALL_ICONS} theme={theme} lang={lang} onIconPress={onIconPress} />
    </div>
  );
}
