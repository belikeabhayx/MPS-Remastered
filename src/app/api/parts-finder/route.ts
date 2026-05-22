import { NextRequest, NextResponse } from 'next/server';
import { fetchCategoriesByBrand, fetchModelsByBrandAndCategory } from '@/lib/woocommerce/brands';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const lang = searchParams.get('lang') || 'en';

    if (type === 'categories') {
        const brandIdRaw = searchParams.get('brandId');
        if (!brandIdRaw) {
            return NextResponse.json({ error: 'Missing brandId' }, { status: 400 });
        }
        const brandId = parseInt(brandIdRaw, 10);
        if (isNaN(brandId)) {
            return NextResponse.json({ error: 'Invalid brandId' }, { status: 400 });
        }
        try {
            const categories = await fetchCategoriesByBrand(brandId, lang);
            return NextResponse.json({ categories });
        } catch (error: any) {
            if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
            console.error('Error in API parts-finder categories:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

    if (type === 'models') {
        const brandIdRaw = searchParams.get('brandId');
        const categoryIdRaw = searchParams.get('categoryId');
        if (!brandIdRaw || !categoryIdRaw) {
            return NextResponse.json({ error: 'Missing brandId or categoryId' }, { status: 400 });
        }
        const brandId = parseInt(brandIdRaw, 10);
        const categoryId = parseInt(categoryIdRaw, 10);
        if (isNaN(brandId) || isNaN(categoryId)) {
            return NextResponse.json({ error: 'Invalid brandId or categoryId' }, { status: 400 });
        }
        try {
            const models = await fetchModelsByBrandAndCategory(brandId, categoryId, lang);
            return NextResponse.json({ models });
        } catch (error: any) {
            if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
            console.error('Error in API parts-finder models:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
}
