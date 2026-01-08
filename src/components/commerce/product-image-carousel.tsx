'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductImageCarouselProps {
    images: Array<{
        id: string;
        preview: string;
        source: string;
    }>;
}

// Normalize image URL - fix backslashes to forward slashes
const normalizeImageUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    return url.replace(/\\/g, '/');
};

export function ProductImageCarousel({ images }: ProductImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square bg-muted rounded-lg flex flex-col items-center justify-center">
                <ImageOff className="w-12 h-12 mb-2 opacity-50 text-muted-foreground" />
                <span className="text-muted-foreground">No images available</span>
            </div>
        );
    }

    const handleImageError = (index: number) => {
        setImageErrors((prev) => new Set(prev).add(index));
    };

    const currentImage = images[currentIndex];
    const normalizedSource = normalizeImageUrl(currentImage?.source);
    const hasError = imageErrors.has(currentIndex);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden group">
                {normalizedSource && !hasError ? (
                    <Image
                        src={normalizedSource}
                        alt={`Product image ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={currentIndex === 0}
                        onError={() => handleImageError(currentIndex)}
                        unoptimized={normalizedSource.includes('my-shop.com')}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-muted">
                        <ImageOff className="w-12 h-12 mb-2 opacity-50 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Image unavailable</span>
                    </div>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={goToPrevious}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={goToNext}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => {
                        const normalizedPreview = normalizeImageUrl(image.preview);
                        const thumbnailHasError = imageErrors.has(index);
                        
                        return (
                            <button
                                key={image.id}
                                onClick={() => setCurrentIndex(index)}
                                className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-colors ${
                                    index === currentIndex
                                        ? 'border-primary'
                                        : 'border-transparent hover:border-muted-foreground'
                                }`}
                            >
                                {normalizedPreview && !thumbnailHasError ? (
                                    <Image
                                        src={normalizedPreview}
                                        alt={`Thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="25vw"
                                        onError={() => handleImageError(index)}
                                        unoptimized={normalizedPreview.includes('my-shop.com')}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-muted">
                                        <ImageOff className="w-6 h-6 opacity-50 text-muted-foreground" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
