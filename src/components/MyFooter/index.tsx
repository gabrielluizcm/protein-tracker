import { useTranslation } from "react-i18next";
import { FaGithub, FaGithubAlt } from "react-icons/fa";

export default function MyFooter() {
  const { t } = useTranslation();

  return (
    <div className="absolute bottom-2 text-silver text-xs w-full flex flex-col items-center justify-center">
      <p className="flex text-base gap-3 mb-1">
        <a
          href="https://github.com/gabrielluizcm"
          target="_blank"
          className="hover:text-gold active:text-copper">
          <FaGithub />
        </a>
        <a
          href="https://github.com/gabrielluizcm/protein-tracker"
          target="_blank"
          className="hover:text-gold active:text-copper">
          <FaGithubAlt />
        </a>
      </p>
      <p>
        {t('footer.start')} 💪
        <a
          href="https://gabrielluizcm.github.io"
          target="_blank"
          className="text-gold hover:text-copper">
          {t('footer.end')}
        </a>
      </p>
    </div>
  );
}