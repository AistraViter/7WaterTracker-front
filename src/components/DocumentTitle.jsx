import { Helmet } from 'react-helmet-async';

export default function DocumentTitle({ children }) {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
}

// HelmetProvider використовується в React-додатках для управління мета-тегами та іншими елементами заголовку 
// HTML-документа, такими як заголовки сторінок, опис, ключові слова та інші метадані. 