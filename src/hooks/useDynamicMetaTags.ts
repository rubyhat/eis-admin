import { useEffect } from "react";

interface MetaTagsProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export const useDynamicMetaTags = ({
  title,
  description,
  imageUrl,
}: MetaTagsProps) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", title);
    }
    if (description) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
      document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", description);
    }
    if (imageUrl) {
      document
        .querySelector('meta[property="og:image"]')
        ?.setAttribute("content", imageUrl);
    }
  }, [title, description, imageUrl]);
};
