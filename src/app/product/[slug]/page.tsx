import type { Metadata } from 'next';
import { query } from '@/lib/vendure/api';
import { GetProductDetailQuery } from '@/lib/vendure/queries';
import { ProductImageCarousel } from '@/components/product-image-carousel';
import { ProductInfo } from '@/components/product-info';
import { notFound } from 'next/navigation';
import { cacheLife, cacheTag } from 'next/cache';
import {
    SITE_NAME,
    truncateDescription,
    buildCanonicalUrl,
    buildOgImages,
} from '@/lib/metadata';

interface ProductDetailPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getProductData(slug: string) {
    'use cache';
    cacheLife('hours');
    cacheTag(`product-${slug}`);

    return await query(GetProductDetailQuery, { slug });
}

export async function generateMetadata({
    params,
}: ProductDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const result = await getProductData(slug);
    const product = result.data.product;

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    const description = truncateDescription(product.description);
    const ogImage = product.assets?.[0]?.preview;

    return {
        title: product.name,
        description: description || `Shop ${product.name} at ${SITE_NAME}`,
        alternates: {
            canonical: buildCanonicalUrl(`/product/${product.slug}`),
        },
        openGraph: {
            title: product.name,
            description: description || `Shop ${product.name} at ${SITE_NAME}`,
            type: 'website',
            url: buildCanonicalUrl(`/product/${product.slug}`),
            images: buildOgImages(ogImage, product.name),
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: description || `Shop ${product.name} at ${SITE_NAME}`,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}

export default async function ProductDetailPage({ params, searchParams }: ProductDetailPageProps) {
    const { slug } = await params;
    const searchParamsResolved = await searchParams;

    const result = await getProductData(slug);

    const product = result.data.product;

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column: Image Carousel */}
                <div className="lg:sticky lg:top-20 lg:self-start">
                    <ProductImageCarousel images={product.assets} />
                </div>

                {/* Right Column: Product Info */}
                <div>
                    <ProductInfo product={product} searchParams={searchParamsResolved} />
                </div>
            </div>
        </div>
    );
}
