import clsx from 'clsx';

const Prose = ({ html, className }: { html: string; className?: string }) => {
  // Convert plain text line breaks to HTML if the content doesn't contain HTML tags
  const formatContent = (content: string): string => {
    // Check if content already contains HTML tags
    const hasHtmlTags = /<[^>]+>/.test(content);
    
    if (hasHtmlTags) {
      return content; // Already formatted HTML, return as-is
    }
    
    // Convert plain text to HTML with proper formatting
    // Replace double line breaks with paragraph breaks
    // Replace single line breaks with <br> tags
    return content
      .split('\n\n')
      .map(paragraph => {
        const lines = paragraph
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .join('<br />');
        return lines ? `<p>${lines}</p>` : '';
      })
      .filter(p => p.length > 0)
      .join('');
  };

  return (
    <div
      className={clsx(
        'prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline prose-a:hover:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 prose-p:mb-4',
        className
      )}
      dangerouslySetInnerHTML={{ __html: formatContent(html) }}
    />
  );
};

export default Prose;
