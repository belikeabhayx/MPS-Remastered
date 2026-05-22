
/**
 * Unified logic for product availability messages and stock status.
 */

export interface AvailabilityDict {
    inStock?: string;
    outOfStock?: string;
    availableOnBackorder?: string;
    backorderAvailable?: string;
    inStockCount?: string;
}

export const getIsOutOfStock = (stockStatus?: string, availability?: string) => {
    if (stockStatus) {
        return stockStatus === 'outofstock';
    }
    return availability === 'Out of Stock';
};

export const formatInStockCount = (count: string, dict?: AvailabilityDict) => {
    return (dict?.inStockCount || '{count} in stock').replace('{count}', count);
};

export const getAvailabilityText = (
    availability: string, 
    dict?: AvailabilityDict,
    stockStatus?: string,
    physicalStockCount?: number | null,
    allowsBackorder?: boolean
) => {
    if (stockStatus === 'outofstock') return dict?.outOfStock || 'Out of Stock';
    
    if (allowsBackorder) {
        const backorderAvailableText = dict?.backorderAvailable || 'Backorder available';
        if (physicalStockCount != null && physicalStockCount > 0) {
            return `${formatInStockCount(physicalStockCount.toString(), dict)} | ${backorderAvailableText}`;
        }
        return dict?.availableOnBackorder || 'Available on backorder';
    }

    if (physicalStockCount != null && physicalStockCount > 0) {
        return formatInStockCount(physicalStockCount.toString(), dict);
    }

    if (stockStatus === 'instock') return dict?.inStock || 'In Stock';
    
    return availability;
};
