export const staticMenuStructure = {
    home: { key: 'home', href: '/' },
    allProducts: { key: 'all-products', href: '/product-category' },
    aroundTheEngine: {
        key: 'around-the-engine',
        href: '/product-category/around-the-engine',
        items: {
            hosesAndFittings: {
                key: 'hoses-and-fittings',
                href: '/product-category/around-the-engine/hoses-and-fittings',
                items: {
                    exhaustSystem: {
                        key: 'exhaust-system',
                        href: '/product-category/around-the-engine/hoses-and-fittings/exhaust-systems-hoses-and-fittings',
                        items: {
                            exhaustHoses: { key: 'exhaust-hoses', href: '/product-category/around-the-engine/hoses-and-fittings/exhaust-systems-hoses-and-fittings/exhaust-hoses' },
                            waterlocks: { key: 'waterlocks', href: '/product-category/around-the-engine/hoses-and-fittings/exhaust-systems-hoses-and-fittings/waterlocks' },
                        }
                    },
                    fittings: { key: 'fittings', href: '/product-category/around-the-engine/hoses-and-fittings/fittings' },
                    fuelHoses: { key: 'fuel-hoses', href: '/product-category/around-the-engine/hoses-and-fittings/fuel-hoses' },
                    seaStrainers: { key: 'sea-strainers', href: '/product-category/around-the-engine/hoses-and-fittings/sea-strainers' },
                    waterHoses: { key: 'water-hoses', href: '/product-category/around-the-engine/hoses-and-fittings/water-hoses' },
                }
            },
            powerOnBoard: {
                key: 'power-on-board',
                href: '/product-category/around-the-engine/power-on-board',
                items: {
                    batteryCableTags: { key: 'battery-cable-tags', href: '/product-category/around-the-engine/power-on-board/battery-cable-tags' },
                    batteryCables: { key: 'battery-cables', href: '/product-category/around-the-engine/power-on-board/battery-cables' },
                    batteryMainSwitches: { key: 'battery-main-switches', href: '/product-category/around-the-engine/power-on-board/battery-main-switches' },
                    fusesAndFuseHolders: { key: 'fuses-and-fuse-holders', href: '/product-category/around-the-engine/power-on-board/fuses-and-fuse-holders' },
                }
            }
        }
    },
    engineParts: {
        key: 'engine-parts',
        href: '/product-category/engine-parts',
        items: {
            coolingSystems: {
                key: 'cooling-systems',
                href: '/product-category/engine-parts/cooling-systems',
                items: {
                    circulationPumps: { key: 'circulation-pumps', href: '/product-category/engine-parts/cooling-systems/circulation-pumps' },
                    heatExchangers: { key: 'heat-exchangers-aftercoolers', href: '/product-category/engine-parts/cooling-systems/heat-exchangers-aftercoolers' },
                    waterPipes: { key: 'water-pipes-hoses', href: '/product-category/engine-parts/cooling-systems/water-pipes-hoses' },
                    waterPumps: { key: 'water-pumps', href: '/product-category/engine-parts/cooling-systems/water-pumps' },
                }
            },
            electricalSystems: {
                key: 'electrical-systems',
                href: '/product-category/engine-parts/electrical-systems',
                items: {
                    alternators: { key: 'alternators', href: '/product-category/engine-parts/electrical-systems/alternators' },
                    controlUnits: { key: 'control-units-evc-mdi-ecus', href: '/product-category/engine-parts/electrical-systems/control-units-evc-mdi-ecus' },
                    instrumentPanels: { key: 'instrument-panels-displays', href: '/product-category/engine-parts/electrical-systems/instrument-panels-displays' },
                    sensors: { key: 'sensors-temperature-pressure-position-etc', href: '/product-category/engine-parts/electrical-systems/sensors-temperature-pressure-position-etc' },
                    starterMotors: { key: 'starter-motors', href: '/product-category/engine-parts/electrical-systems/starter-motors' },
                    wiringHarnesses: { key: 'wiring-harnesses', href: '/product-category/engine-parts/electrical-systems/wiring-harnesses' },
                }
            },
            engineBlock: {
                key: 'engine-block',
                href: '/product-category/engine-parts/engine-block',
                items: {
                    crankshafts: { key: 'crankshafts-camshafts', href: '/product-category/engine-parts/engine-block/crankshafts-camshafts' },
                    cylinderHeads: { key: 'cylinder-heads', href: '/product-category/engine-parts/engine-block/cylinder-heads' },
                    flywheels: { key: 'flywheels-flywheel-housings', href: '/product-category/engine-parts/engine-block/flywheels-flywheel-housings' },
                    pistons: { key: 'pistons-connecting-rods', href: '/product-category/engine-parts/engine-block/pistons-connecting-rods' },
                    valveCovers: { key: 'valve-covers-oil-sumps', href: '/product-category/engine-parts/engine-block/valve-covers-oil-sumps' },
                    valves: { key: 'valves-accessories', href: '/product-category/engine-parts/engine-block/valves-accessories' },
                }
            },
            lubricationSystem: {
                key: 'lubrication-system',
                href: '/product-category/engine-parts/engine-lubrication-system',
                items: {
                    oilLines: { key: 'oil-lines-accessories', href: '/product-category/engine-parts/engine-lubrication-system/oil-lines-accessories' },
                    oilPumps: { key: 'oil-pumps', href: '/product-category/engine-parts/engine-lubrication-system/oil-pumps' },
                }
            },
            engineMounts: { key: 'engine-mounts', href: '/product-category/engine-parts/engine-mounts-engine-blocks-parts' },
            exhaustSystems: {
                key: 'exhaust-systems',
                href: '/product-category/engine-parts/exhaust-systems',
                items: {
                    exhaustElbows: { key: 'exhaust-elbows', href: '/product-category/engine-parts/exhaust-systems/exhaust-elbows' },
                    exhaustManifolds: { key: 'exhaust-manifolds', href: '/product-category/engine-parts/exhaust-systems/exhaust-manifolds' },
                }
            },
            fuelSystems: {
                key: 'fuel-systems',
                href: '/product-category/engine-parts/fuel-systems',
                items: {
                    fuelFeedPumps: { key: 'fuel-feed-pumps', href: '/product-category/engine-parts/fuel-systems/fuel-feed-pumps' },
                    fuelFilterHousings: { key: 'fuel-filter-housings', href: '/product-category/engine-parts/fuel-systems/fuel-filter-housings' },
                    fuelLines: { key: 'fuel-lines', href: '/product-category/engine-parts/fuel-systems/fuel-lines' },
                    injectionPumps: { key: 'injection-pumps', href: '/product-category/engine-parts/fuel-systems/injection-pumps' },
                    injectors: { key: 'injectors', href: '/product-category/engine-parts/fuel-systems/injectors' },
                }
            },
        }
    },
    engineServiceParts: {
        key: 'engine-service-parts',
        href: '/product-category/engine-service-parts',
        items: {
            oilFilter: { key: 'oil-filters', href: '/product-category/engine-service-parts/oil-filters' },
            fuelFilters: { key: 'fuel-filters', href: '/product-category/engine-service-parts/fuel-filters' },
            airFilters: { key: 'air-filters', href: '/product-category/engine-service-parts/air-filters' },
            crankcaseFilters: { key: 'crankcase-ventilation-filters', href: '/product-category/engine-service-parts/crankcase-ventilation-filters' },
            impellers: { key: 'impellers', href: '/product-category/engine-service-parts/impellers' },
            thermostats: { key: 'thermostats', href: '/product-category/engine-service-parts/thermostats' },
            vBelts: { key: 'v-belts', href: '/product-category/engine-service-parts/v-belts' },
            serviceKits: { key: 'service-kits', href: '/product-category/engine-service-parts/service-kits' },
            anodes: { key: 'anodes-engine-service-parts', href: '/product-category/engine-service-parts/anodes-engine-service-parts' },
            bellows: { key: 'bellows', href: '/product-category/engine-service-parts/bellows' },
            stuffingBox: { key: 'stuffing-box', href: '/product-category/engine-service-parts/stuffing-box' },
            maintenanceKits: {
                key: 'maintenance-repair-kits',
                href: '/product-category/maintenance-repair-kits',
                items: {
                    engineGaskets: { key: 'engine-gaskets', href: '/product-category/maintenance-repair-kits/engine-gaskets' },
                    saildriveKits: { key: 'saildrive-repair-kits', href: '/product-category/maintenance-repair-kits/saildrive-repair-kits' },
                    waterPumpParts: { key: 'water-pump-parts', href: '/product-category/maintenance-repair-kits/water-pump-parts' },
                }
            },
            oilsAndLiquids: {
                key: 'oils-liquids',
                href: '/product-category/engine-service-parts/oils-liquids',
                items: {
                    additives: { key: 'additives-miscellaneous', href: '/product-category/engine-service-parts/oils-liquids/additives-miscellaneous' },
                    coolant: { key: 'coolant', href: '/product-category/engine-service-parts/oils-liquids/coolant-oils-liquids' },
                    oil: { key: 'oil', href: '/product-category/engine-service-parts/oils-liquids/oil' },
                    transmissionOil: { key: 'transmission-oil', href: '/product-category/engine-service-parts/oils-liquids/transmission-oil' },
                }
            },
            otherMaintenance: {
                key: 'other-maintenance-products',
                href: '/product-category/engine-service-parts/other-maintenance-products',
                items: {
                    sealants: { key: 'sealants-lubricant-paint', href: '/product-category/engine-service-parts/other-maintenance-products/sealants-lubricant-paint' },
                }
            },
        }
    },
    engines: { key: 'engines', href: '/product-category/engines' },
    blogs: { key: 'blogs', href: '/blogs' },
    contactUs: { key: 'contact-us', href: '/contact-us' },
    aboutUs: { key: 'about-us', href: '/about-us' },
};

export const MENU_TRANSLATIONS: Record<string, Record<string, string>> = {
  'home': {
    en: "Home",
    de: "Startseite",
    es: "Inicio",
    nl: "Home"
  },
  'all-products': {
    en: "All Products",
    de: "Alle Produkte",
    es: "Todos los productos",
    nl: "Alle producten"
  },
  'around-the-engine': {
    en: "Around the Engine",
    de: "Rund um den Motor",
    es: "Alrededor del motor",
    nl: "Rondom de motor"
  },
  'hoses-and-fittings': {
    en: "Hoses & Fittings",
    de: "Schläuche & Anschlüsse",
    es: "Mangueras y racores",
    nl: "Slangen & fittingen"
  },
  'exhaust-system': {
    en: "Exhaust Systems, Hoses & Fittings",
    de: "Abgassysteme, Schläuche & Anschlüsse",
    es: "Sistemas de escape, mangueras y racores",
    nl: "Uitlaatsystemen, slangen & fittingen"
  },
  'exhaust-hoses': {
    en: "Exhaust Hoses",
    de: "Auspuffschläuche",
    es: "Mangueras de escape",
    nl: "Uitlaatslangen"
  },
  'waterlocks': {
    en: "Waterlocks",
    de: "Wassersammler",
    es: "Silenciadores",
    nl: "Waterlocks"
  },
  'fittings': {
    en: "Fittings",
    de: "Anschlüsse",
    es: "Racores",
    nl: "Fittingen"
  },
  'fuel-hoses': {
    en: "Fuel Hoses",
    de: "Kraftstoffschläuche",
    es: "Mangueras de combustible",
    nl: "Brandstofslangen"
  },
  'sea-strainers': {
    en: "Sea Strainers",
    de: "Seewasserfilter",
    es: "Filtros de agua salada",
    nl: "Wierpotten"
  },
  'water-hoses': {
    en: "Water Hoses",
    de: "Wasserschläuche",
    es: "Mangueras de agua",
    nl: "Waterslangen"
  },
  'power-on-board': {
    en: "Power on Board",
    de: "Strom an Bord",
    es: "Energía a bordo",
    nl: "Stroom aan boord"
  },
  'battery-cable-tags': {
    en: "Battery Cable Tags",
    de: "Batteriekabelklemmen",
    es: "Terminales de cable de batería",
    nl: "Accukabel klemmen"
  },
  'battery-cables': {
    en: "Battery Cables",
    de: "Batteriekabel",
    es: "Cables de batería",
    nl: "Accukabels"
  },
  'battery-main-switches': {
    en: "Battery Main Switches",
    de: "Batterie-Hauptschalter",
    es: "Desconectadores de batería",
    nl: "Accu hoofdschakelaars"
  },
  'fuses-and-fuse-holders': {
    en: "Fuses & Fuse Holders",
    de: "Sicherungen & Sicherungshalter",
    es: "Fusibles y portafusibles",
    nl: "Zekeringen & zekeringhouders"
  },
  'engine-parts': {
    en: "Engine Parts",
    de: "Motorenteile",
    es: "Piezas del motor",
    nl: "Motoronderdelen"
  },
  'cooling-systems': {
    en: "Cooling Systems",
    de: "Kühlsysteme",
    es: "Sistemas de refrigeración",
    nl: "Koelsystemen"
  },
  'circulation-pumps': {
    en: "Circulation Pumps",
    de: "Umwälzpumpen",
    es: "Bombas de circulación",
    nl: "Circulatiepompen"
  },
  'heat-exchangers-aftercoolers': {
    en: "Heat Exchangers & Aftercoolers",
    de: "Wärmetauscher & Ladeluftkühler",
    es: "Intercambiadores de calor e intercoolers",
    nl: "Warmtewisselaars & nakoelers"
  },
  'water-pipes-hoses': {
    en: "Water Pipes & Hoses",
    de: "Wasserrohre & Schläuche",
    es: "Tubos y mangueras de agua",
    nl: "Waterpijpen & slangen"
  },
  'water-pumps': {
    en: "Water Pumps",
    de: "Wasserpumpen",
    es: "Bombas de agua",
    nl: "Waterpompen"
  },
  'electrical-systems': {
    en: "Electrical Systems",
    de: "Elektrische Systeme",
    es: "Sistemas eléctricos",
    nl: "Elektrische systemen"
  },
  'alternators': {
    en: "Alternators",
    de: "Lichtmaschinen",
    es: "Alternadores",
    nl: "Dynamo's"
  },
  'control-units-evc-mdi-ecus': {
    en: "Control Units (EVC, MDI, ECUs)",
    de: "Steuergeräte (EVC, MDI, ECUs)",
    es: "Unidades de control (EVC, MDI, ECUs)",
    nl: "Regeleenheden (EVC, MDI, ECU's)"
  },
  'instrument-panels-displays': {
    en: "Instrument Panels & Displays",
    de: "Instrumententafeln & Displays",
    es: "Paneles de instrumentos y pantallas",
    nl: "Instrumentenpanelen & displays"
  },
  'sensors-temperature-pressure-position-etc': {
    en: "Sensors (Temp, Pressure, Position, etc)",
    de: "Sensoren (Temp, Druck, Position usw.)",
    es: "Sensores (Temp, Presión, Posición, etc)",
    nl: "Sensoren (Temp, Druk, Positie, enz.)"
  },
  'starter-motors': {
    en: "Starter Motors",
    de: "Anlasser",
    es: "Motores de arranque",
    nl: "Startmotoren"
  },
  'wiring-harnesses': {
    en: "Wiring Harnesses",
    de: "Kabelbäume",
    es: "Arneses de cableado",
    nl: "Kabelbomen"
  },
  'engine-block': {
    en: "Engine Block",
    de: "Motorblock",
    es: "Bloque del motor",
    nl: "Motorblok"
  },
  'crankshafts-camshafts': {
    en: "Crankshafts & Camshafts",
    de: "Kurbelwellen & Nockenwellen",
    es: "Cigüeñales y árboles de levas",
    nl: "Krukassen & nokkenassen"
  },
  'cylinder-heads': {
    en: "Cylinder Heads",
    de: "Zylinderköpfe",
    es: "Culatas",
    nl: "Cilinderkoppen"
  },
  'flywheels-flywheel-housings': {
    en: "Flywheels & Flywheel Housings",
    de: "Schwungräder & Schwungradgehäuse",
    es: "Volantes y carcasas de volante",
    nl: "Vliegwielen & vliegwielhuizen"
  },
  'pistons-connecting-rods': {
    en: "Pistons & Connecting Rods",
    de: "Kolben & Pleuelstangen",
    es: "Pistones y bielas",
    nl: "Zuigers & drijfstangen"
  },
  'valve-covers-oil-sumps': {
    en: "Valve Covers & Oil Sumps",
    de: "Ventildeckel & Ölwannen",
    es: "Tapas de válvulas y cárteres de aceite",
    nl: "Klepdeksels & carters"
  },
  'valves-accessories': {
    en: "Valves & Accessories",
    de: "Ventile & Zubehör",
    es: "Válvulas y accesorios",
    nl: "Kleppen & accessoires"
  },
  'engine-lubrication-system': {
    en: "Lubrication System",
    de: "Schmiersystem",
    es: "Sistema de lubricación",
    nl: "Smeersysteem"
  },
  'lubrication-system': {
    en: "Lubrication System",
    de: "Schmiersystem",
    es: "Sistema de lubricación",
    nl: "Smeersysteem"
  },
  'oil-lines-accessories': {
    en: "Oil Lines & Accessories",
    de: "Ölleitungen & Zubehör",
    es: "Líneas de aceite y accesorios",
    nl: "Olieleidingen & accessoires"
  },
  'oil-pumps': {
    en: "Oil Pumps",
    de: "Ölpumpen",
    es: "Bombas de aceite",
    nl: "Oliepompen"
  },
  'engine-mounts': {
    en: "Engine Mounts",
    de: "Motorlager",
    es: "Soportes de motor",
    nl: "Motorsteunen"
  },
  'engine-mounts-engine-blocks-parts': {
    en: "Engine Mounts",
    de: "Motorlager",
    es: "Soportes de motor",
    nl: "Motorsteunen"
  },
  'exhaust-systems': {
    en: "Exhaust Systems",
    de: "Abgassysteme",
    es: "Sistemas de escape",
    nl: "Uitlaatsystemen"
  },
  'exhaust-elbows': {
    en: "Exhaust Elbows",
    de: "Auspuffkrümmer",
    es: "Codos de escape",
    nl: "Uitlaatbochten"
  },
  'exhaust-manifolds': {
    en: "Exhaust Manifolds",
    de: "Abgaskrümmer",
    es: "Colectores de escape",
    nl: "Uitlaatspruitstukken"
  },
  'fuel-systems': {
    en: "Fuel Systems",
    de: "Kraftstoffsysteme",
    es: "Sistemas de combustible",
    nl: "Brandstofsystemen"
  },
  'fuel-feed-pumps': {
    en: "Fuel Feed Pumps",
    de: "Kraftstoffförderpumpen",
    es: "Bombas de alimentación de combustible",
    nl: "Brandstofopvoerpompen"
  },
  'fuel-filter-housings': {
    en: "Fuel Filter Housings",
    de: "Kraftstofffiltergehäuse",
    es: "Carcasas de filtro de combustible",
    nl: "Brandstoffilterhuizen"
  },
  'fuel-lines': {
    en: "Fuel Lines",
    de: "Kraftstoffleitungen",
    es: "Líneas de combustible",
    nl: "Brandstofleidingen"
  },
  'injection-pumps': {
    en: "Injection Pumps",
    de: "Einspritzpumpen",
    es: "Bombas de inyección",
    nl: "Injectiepompen"
  },
  'injectors': {
    en: "Injectors",
    de: "Einspritzdüsen",
    es: "Inyectores",
    nl: "Injectoren"
  },
  'engine-service-parts': {
    en: "Engine Service Parts",
    de: "Motor-Service-Teile",
    es: "Piezas de mantenimiento del motor",
    nl: "Motor serviceonderdelen"
  },
  'oil-filters': {
    en: "Oil Filters",
    de: "Ölfilter",
    es: "Filtros de aceite",
    nl: "Oliefilters"
  },
  'fuel-filters': {
    en: "Fuel Filters",
    de: "Kraftstofffilter",
    es: "Filtros de combustible",
    nl: "Brandstoffilters"
  },
  'air-filters': {
    en: "Air Filters",
    de: "Luftfilter",
    es: "Filtros de aire",
    nl: "Luchtfilters"
  },
  'crankcase-ventilation-filters': {
    en: "Crankcase Ventilation Filters",
    de: "Kurbelgehäuseentlüftungsfilter",
    es: "Filtros de ventilación del cárter",
    nl: "Carterventilatie filters"
  },
  'impellers': {
    en: "Impellers",
    de: "Impeller",
    es: "Impulsores",
    nl: "Impellers"
  },
  'thermostats': {
    en: "Thermostats",
    de: "Thermostate",
    es: "Termostatos",
    nl: "Thermostaten"
  },
  'v-belts': {
    en: "V-Belts",
    de: "Keilriemen",
    es: "Correas trapezoidales",
    nl: "V-snaren"
  },
  'service-kits': {
    en: "Service Kits",
    de: "Service-Kits",
    es: "Kits de servicio",
    nl: "Servicekits"
  },
  'anodes-engine-service-parts': {
    en: "Anodes",
    de: "Anoden",
    es: "Ánodos",
    nl: "Anoden"
  },
  'bellows': {
    en: "Bellows",
    de: "Bälge",
    es: "Fuelles",
    nl: "Balgen"
  },
  'stuffing-box': {
    en: "Stuffing Box",
    de: "Stopfbuchse",
    es: "Prensaestopas",
    nl: "Schroefasafdichtingen"
  },
  'maintenance-repair-kits': {
    en: "Maintenance & Repair Kits",
    de: "Wartungs- & Reparatursätze",
    es: "Kits de mantenimiento y reparación",
    nl: "Onderhouds- & reparatiekits"
  },
  'engine-gaskets': {
    en: "Engine Gaskets",
    de: "Motordichtungen",
    es: "Juntas de motor",
    nl: "Motor pakkingen"
  },
  'saildrive-repair-kits': {
    en: "Saildrive Repair Kits",
    de: "Saildrive-Reparatursätze",
    es: "Kits de reparación de saildrive",
    nl: "Saildrive reparatiekits"
  },
  'water-pump-parts': {
    en: "Water Pump Parts",
    de: "Wasserpumpenteile",
    es: "Piezas de bomba de agua",
    nl: "Waterpomonderdelen"
  },
  'oils-liquids': {
    en: "Oils & Liquids",
    de: "Öle & Flüssigkeiten",
    es: "Aceites y líquidos",
    nl: "Oliën & vloeistoffen"
  },
  'additives-miscellaneous': {
    en: "Additives & Miscellaneous",
    de: "Additive & Sonstiges",
    es: "Aditivos y misceláneos",
    nl: "Additieven & diversen"
  },
  'coolant-oils-liquids': {
    en: "Coolant",
    de: "Kühlmittel",
    es: "Refrigerante",
    nl: "Koelvloeistof"
  },
  'oil': {
    en: "Oil",
    de: "Öl",
    es: "Aceite",
    nl: "Olie"
  },
  'transmission-oil': {
    en: "Transmission Oil",
    de: "Getriebeöl",
    es: "Aceite de transmisión",
    nl: "Transmissieolie"
  },
  'other-maintenance-products': {
    en: "Other Maintenance Products",
    de: "Andere Wartungsprodukte",
    es: "Otros productos de mantenimiento",
    nl: "Andere onderhoudsproducten"
  },
  'sealants-lubricant-paint': {
    en: "Sealants, Lubricants & Paint",
    de: "Dichtstoffe, Schmiermittel & Lacke",
    es: "Selladores, lubricantes y pintura",
    nl: "Kitten, smeermiddelen & verf"
  },
  'engines': {
    en: "Engines",
    de: "Motoren",
    es: "Motores",
    nl: "Motoren"
  },
  'blogs': {
    en: "Blogs",
    de: "Blogs",
    es: "Blogs",
    nl: "Blogs"
  },
  'contact-us': {
    en: "Contact Us",
    de: "Kontaktieren Sie uns",
    es: "Contáctenos",
    nl: "Neem contact op"
  },
  'about-us': {
    en: "About Us",
    de: "Über uns",
    es: "Sobre nosotros",
    nl: "Over ons"
  }
};

export interface MenuItem {
  name: string;
  href?: string;
  key?: string;
  items?: MenuItem[];
}

export function getMenuTranslation(key: string, locale: string): string {
  const normalizedKey = key.toLowerCase();
  const translations = MENU_TRANSLATIONS[normalizedKey];
  if (translations) {
    return translations[locale] || translations['en'] || key;
  }
  
  // Clean format as fallback
  return key
    .replace(/-/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function buildMenuItems(structureObj: any, currentLang: string): MenuItem[] {
    return Object.keys(structureObj).map(key => {
        const item = structureObj[key];
        const menuItem: MenuItem = {
            key: item.key,
            href: item.href,
            name: getMenuTranslation(item.key, currentLang),
        };
        
        if (item.items) {
            menuItem.items = buildMenuItems(item.items, currentLang);
        }
        
        return menuItem;
    });
}
