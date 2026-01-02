import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url

    // Core routes
    const routes = [
        '',
        '/products',
        '/products/corrugated',
        '/products/luxury-rigid',
        '/products/pharma',
        '/products/food-packaging',
        '/products/folding-cartons',
        '/products/ecommerce-packaging',
        '/solutions',
        '/industry/pharmaceutical',
        '/industry/food-beverage',
        '/industry/cosmetics',
        '/industry/ecommerce',
        '/industry/electronics',
        '/industry/automotive',
        '/services',
        '/services/design',
        '/services/bulk-orders',
        '/services/testing',
        '/services/sustainability',
        '/services/consultation',
        '/resources',
        '/resources/guides',
        '/resources/calculator',
        '/resources/case-studies',
        '/resources/catalog',
        '/about',
        '/contact',
        '/configurator',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))
}
