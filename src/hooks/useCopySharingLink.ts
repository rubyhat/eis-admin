/* eslint-disable no-console */
import toast from "react-hot-toast";
import { useScreenSize } from "./useScreenSize";

interface ShareLinkProps {
  title: string;
  text: string;
  url: string;
}

export const useCopySharingLink = () => {
  const { isMobile, isMobileDevice } = useScreenSize();

  const copyLink = (msg?: string) => {
    const url = window.location.href;

    // Копирование URL в буфер обмена, todo: create beatify modal for this
    navigator.clipboard
      .writeText(msg || url)
      .then(() => {
        toast.success(
          "Ссылка успешно скопирована! Теперь вы можете поделиться ею в WhatsApp или любом другом приложении",
          { duration: 10000 },
        );
      })
      .catch((err) => {
        toast.error(
          "Не удалось скопировать ссылку, возможно Ваш браузер заблокировал это действие",
        );
        console.error("Ошибка при копировании: ", err);
      });
  };

  // Шеринг на мобильном устройстве в другие приложения
  const deviceShareLink = async ({ title, text, url }: ShareLinkProps) => {
    if (
      typeof navigator.share !== "undefined" &&
      (isMobileDevice || isMobile)
    ) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        toast.error(
          "Не удалось скопировать ссылку, возможно Вы отменили действие или Ваш браузер заблокировал это действие",
          { duration: 5000 },
        );

        console.error("Ошибка при шеринге: ", err);
      }
    }
  };

  return { copyLink, deviceShareLink };
};
