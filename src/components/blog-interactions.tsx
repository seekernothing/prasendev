'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Share2 } from 'lucide-react';

interface BlogInteractionsProps {
  slug: string;  // Keep slug for future use if needed
}

export function BlogInteractions({ slug }: BlogInteractionsProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string>('');
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = typeof document !== 'undefined' ? document.title : '';

  // Ensure Twitter widgets load on client-side navigations
  useEffect(() => {
    let attempts = 0;
    const loadTwitter = () => {
      // @ts-ignore
      if (window.twttr && window.twttr.widgets) {
        // @ts-ignore
        window.twttr.widgets.load();
      } else if (attempts < 10) {
        attempts++;
        setTimeout(loadTwitter, 500);
      }
    };
    loadTwitter();
  }, [slug]);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopySuccess('Link copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-8 mb-24 md:mb-8">
      <Button
        onClick={handleShare}
        disabled={isSharing}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        <span>{isSharing ? 'Sharing...' : 'Share'}</span>
      </Button>
      {copySuccess && (
        <span className="text-sm text-green-600 dark:text-green-400">
          {copySuccess}
        </span>
      )}
    </div>
  );
}