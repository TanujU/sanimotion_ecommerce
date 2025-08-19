export interface MockProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  images: {
    id: string;
    url: string;
    altText: string;
  }[];
  variants: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
  }[];
  tags: string[];
}

export interface MockCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  products: MockProduct[];
}

export interface MockCartItem {
  id: string;
  quantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: any[];
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: {
        url: string;
        altText: string;
      };
    };
  };
}

export interface MockCart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: MockCartItem[];
  totalQuantity: number;
}

export const mockProducts: MockProduct[] = [
  // ===== HYALURONIC ACID PRODUCTS =====
  {
    id: '1',
    title: 'Aqualyx Lipolyse (10 x 8 ml)',
    handle: 'aqualyx',
    description: '<p class="p1" style="width: 100%; max-width: 800px;">Aqualyx stellt die ideale Lösung für die gezielte Bekämpfung von hartnäckigen Fettansammlungen an verschiedenen Körperregionen dar, darunter Wangen, Bauch, Hüften und Oberschenkel.</p>\n\n<p class="p2" style="width: 100%; max-width: 800px;">Entwickelt für die gezielte Behandlung kleiner lokaler Fettdepots am gesamten Körper, setzt Aqualyx auf eine einzigartige Formel aus Phosphatidylcholin und Wasser. Dieses effektive Produkt von Marllor Biomedical wirkt Fettansammlungen an Kinn, Rücken, Brust, Hüften, Oberschenkeln und sogar am Nacken entgegen. Zusätzlich zerstört die Lösung Fettzellen und verhindert die Bildung neuer Zellen, wodurch das Produkt nicht nur schnell, sondern auch langfristig wirksam ist. Die nachhaltige Wirkung setzt voraus, dass ein gesunder Lebensstil beibehalten wird. Mit seinen vielen positiven Eigenschaften bietet diese gut verträgliche Lösung eine echte Alternative zu invasiven chirurgischen Eingriffen, insbesondere der zeitaufwendigen Fettabsaugung.</p>\n\n<p class="p1" style="width: 100%; max-width: 800px;">Warum Aqualyx die perfekte Lösung zur Fettreduktion ist:</p>\n\n<p class="p2" style="width: 100%; max-width: 800px;">Dank seiner einzigartigen Formel auf Wasser- und Phosphatidylcholin-Basis wirkt Aqualyx gezielt gegen lokale Fettansammlungen im gesamten Körper. Die spezielle Formel wird an den gewünschten Stellen angewendet, wo sie Fettzellen gezielt angreift und zerstört. Innerhalb von durchschnittlich 3 Wochen scheidet der Körper das freigesetzte Fett eigenständig über den Stoffwechsel aus, wodurch die behandelten Bereiche eine verbesserte Kontur aufweisen. Diese Lösung eignet sich besonders für kleine, hartnäckige Fettpölsterchen, die trotz Sport und gesunder Ernährung bestehen bleiben.</p>\n\n<p class="p1" style="width: 100%; max-width: 800px;">Die Wirkungsweise dieser außergewöhnlichen Fettreduktionslösung:</p>\n\n<p class="p3" style="width: 100%; max-width: 800px;">Die Lösung von Mallor Biomedical unterstützt schlanke und sportliche Personen dabei, kleine, hartnäckige Fettpölsterchen nachhaltig zu reduzieren. Durch die einzigartige Formel werden Fettzellen in ihre Einzelteile zerlegt, die der Körper innerhalb von 3 Wochen ausscheidet. Die Behandlung zeichnet sich durch eine schnelle und schmerzfreie Wirkungsweise aus. Durch den Kauf von Aqualyx heute können Sie das Fett Ihrer Patienten effizient und unkompliziert schmelzen lassen!</p>',
    price: {
      amount: '178.50',
      currencyCode: 'EUR'
    },
    images: [
      {
        id: '1',
        url: '/images/aqualyx.jpg',
        altText: 'Aqualyx Injectable Solution'
      }
    ],
    variants: [
      {
        id: '1',
        title: 'Default Title',
        price: {
          amount: '178.50',
          currencyCode: 'EUR'
        }
      }
    ],
    tags: ['hyaluronic-acid', 'injectable', 'fat-reduction']
  },
  {
    id: '2',
    title: 'Belotero',
    handle: 'Belotero-serie',
    description: 'Premium Hyaluronsäure-Filler für Gesichtskonturierung und Faltenbehandlung.',
    price: {
      amount: '166.99',
      currencyCode: 'EUR'
    },
    images: [
      {
        id: '2',
        url: '/images/belotero.jpg',
        altText: 'Belotero-Serie Fillers'
      }
    ],
    variants: [
      {
        id: '2',
        title: 'Default Title',
        price: {
          amount: '166.99',
          currencyCode: 'EUR'
        }
      }
    ],
    tags: ['hyaluronic-acid', 'filler', 'facial']
  },
  {
    id: '3',
    title: 'Juvederm',
    handle: 'juvederm-serie',
    description: 'Fortschrittliche Hyaluronsäure-Dermalfiller für Gesichtsvolumisierung und Faltenkorrektur.',
    price: {
      amount: '213.99',
      currencyCode: 'EUR'
    },
    images: [
      {
        id: '3',
        url: '/images/juvederm.jpg',
        altText: 'Juvederm-Serie Fillers'
      }
    ],
    variants: [
      {
        id: '3',
        title: 'Default Title',
        price: {
          amount: '213.99',
          currencyCode: 'EUR'
        }
      }
    ],
    tags: ['hyaluronic-acid', 'filler', 'facial']
  },
  {
    id: '4',
    title: 'Teosyal',
    handle: 'teosyal-serie',
    description: 'Schweizer Hyaluronsäure-Filler für natürliche Gesichtsverbesserung.',
    price: {
      amount: '142.99',
      currencyCode: 'EUR'
    },
    images: [
      {
        id: '4',
        url: '/images/teoxane.jpg',
        altText: 'Teosyal-Serie Fillers'
      }
    ],
    variants: [
      {
        id: '4',
        title: 'Default Title',
        price: {
          amount: '142.99',
          currencyCode: 'EUR'
        }
      }
    ],
    tags: ['hyaluronic-acid', 'filler', 'facial']
  },
  {
    id: '5',
    title: 'Stylage',
    handle: 'stylage-serie',
    description: 'Französische Hyaluronsäure-Filler mit fortschrittlicher Vernetzungstechnologie.',
    price: {
      amount: '114.99',
      currencyCode: 'EUR'
    },
    images: [
      {
        id: '5',
        url: '/images/stylage.jpg',
        altText: 'Stylage-Serie Fillers'
      }
    ],
    variants: [
      {
        id: '5',
        title: 'Default Title',
        price: {
          amount: '114.99',
          currencyCode: 'EUR'
        }
      }
    ],
    tags: ['hyaluronic-acid', 'filler', 'facial']
  },
  {
    id: '6',
    title: 'Radiesse',
    handle: 'radiesse',
    description: 'Calcium-Hydroxylapatit-Filler für Gesichtsvolumisierung und Faltenbehandlung.',
    price: {
      amount: '119.00', 
      currencyCode: 'EUR'
    },
    images: [
      {
        id: '6',
        url: '/images/radiesse.jpg',
        altText: 'Radiesse Filler'
      }
    ],
    variants: [
      {
        id: '6',
        title: 'Default Title',
        price: {
          amount: '119.00', 
          currencyCode: 'EUR'
        }
      }
    ],
    tags: ['calcium-hydroxylapatite', 'filler', 'facial']
  },
  // {
  //   id: '7',
  //   title: 'Prostolane',
  //   handle: 'prostolane',
  //   description: 'Polyacrylamid-Hydrogel für Gesichtskonturierung und Volumisierung.',
  //   price: {
  //     amount: '300.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '7',
  //       url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=800&fit=crop',
  //       altText: 'Prostolane Hydrogel'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '7',
  //       title: 'Default Title',
  //       price: {
  //         amount: '300.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['polyacrylamide', 'hydrogel', 'facial']
  // },
  {
    id: '8',
    title: 'PROFHILO',
    handle: 'profhilo',
    description: 'Bio-Remodeling-Behandlung für Hautfeuchtigkeit und Verjüngung.',
    price: {
      amount: '105.99',
      currencyCode: 'EUR'
    },
    images: [
      {
        id: '8',
        url: '/images/profhilo.jpg',
        altText: 'PROFHILO Bio-remodeling'
      }
    ],
    variants: [
      {
        id: '8',
        title: 'Default Title',
        price: {
          amount: '105.99',
          currencyCode: 'EUR'
        }
      }
    ],
    tags: ['bio-remodeling', 'skin-rejuvenation', 'hydration']
  },
  {
    id: '9',
    title: 'Restylane',
    handle: 'restylane-serie',
    description: 'Schwedische Hyaluronsäure-Filler für natürliche Gesichtsverbesserung.',
    price: {
      amount: '59.99',
      currencyCode: 'EUR'
    },
    images: [
      {
        id: '9',
        url: '/images/restylane.jpg',
        altText: 'Restylane-Serie Fillers'
      }
    ],
    variants: [
      {
        id: '9',
        title: 'Default Title',
        price: {
          amount: '59.99',
          currencyCode: 'EUR'
        }
      }
    ],
    tags: ['hyaluronic-acid', 'filler', 'facial']
  },
  {
    id: '10',
    title: 'Saypha',
    handle: 'saypha-princess',
    description: 'Premium Hyaluronsäure-Filler für Gesichtskonturierung und Volumisierung.',
    price: {
      amount: '37.99',
      currencyCode: 'EUR'
    },
    images: [
      {
        id: '10',
        url: '/images/saypha.jpg',
        altText: 'Saypha Princess Fillers'
      }
    ],
    variants: [
      {
        id: '10',
        title: 'Default Title',
        price: {
          amount: '37.99',
          currencyCode: 'EUR'
        }
      }
    ],
    tags: ['hyaluronic-acid', 'filler', 'facial']
  },
  // {
  //   id: '11',
  //   title: 'Filorga',
  //   handle: 'filorga',
  //   description: 'Französische Anti-Aging-Behandlungen und Hyaluronsäure-Filler.',
  //   price: {
  //     amount: '190.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '11',
  //       url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=800&fit=crop',
  //       altText: 'Filorga Anti-aging'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '11',
  //       title: 'Default Title',
  //       price: {
  //         amount: '190.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['anti-aging', 'hyaluronic-acid', 'facial']
  // },
  {
    id: '12',
    title: 'Hyalone',
    handle: 'hyalone',
    description: 'Hyaluronsäure-basierte Behandlung für Gelenkschmierung und Schmerzlinderung.',
    price: {
      amount: '135.99',
      currencyCode: 'EUR'
    },
    images: [
      {
        id: '12',
        url: '/images/hyalone.jpg',
        altText: 'Hyalone Joint Treatment'
      }
    ],
    variants: [
      {
        id: '12',
        title: 'Default Title',
        price: {
          amount: '135.99',
          currencyCode: 'EUR'
        }
      }
    ],
    tags: ['hyaluronic-acid', 'joint-treatment', 'pain-relief']
  },
  // {
  //   id: '13',
  //   title: 'Hymovis / Hyadd',
  //   handle: 'hymovis-hyadd',
  //   description: 'Hochmolekulare Hyaluronsäure für Gelenkviskosupplementation.',
  //   price: {
  //     amount: '140.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '13',
  //       url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=800&fit=crop',
  //       altText: 'Hymovis Hyadd Joint Treatment'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '13',
  //       title: 'Default Title',
  //       price: {
  //         amount: '140.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['hyaluronic-acid', 'joint-treatment', 'viscosupplementation']
  // },
  // {
  //   id: '14',
  //   title: 'HYALUBRIX',
  //   handle: 'hyalubrix',
  //   description: 'Hyaluronsäure-Injektion für Gelenkschmierung und Arthrosebehandlung.',
  //   price: {
  //     amount: '130.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '14',
  //       url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=800&fit=crop',
  //       altText: 'HYALUBRIX Joint Injection'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '14',
  //       title: 'Default Title',
  //       price: {
  //         amount: '130.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['hyaluronic-acid', 'joint-treatment', 'osteoarthritis']
  // },
  // {
  //   id: '15',
  //   title: 'Durolane',
  //   handle: 'durolane',
  //   description: 'Einmal-Injektion Hyaluronsäure-Behandlung für Kniearthrose.',
  //   price: {
  //     amount: '160.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '15',
  //       url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=800&fit=crop',
  //       altText: 'Durolane Knee Treatment'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '15',
  //       title: 'Default Title',
  //       price: {
  //         amount: '160.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['hyaluronic-acid', 'knee-treatment', 'osteoarthritis']
  // },
  // {
  //   id: '16',
  //   title: 'Monovisc',
  //   handle: 'monovisc',
  //   description: 'Hochmolekulare Hyaluronsäure für Kniearthrose-Behandlung.',
  //   price: {
  //     amount: '170.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '16',
  //       url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=800&fit=crop',
  //       altText: 'Monovisc Knee Treatment'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '16',
  //       title: 'Default Title',
  //       price: {
  //         amount: '170.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['hyaluronic-acid', 'knee-treatment', 'osteoarthritis']
  // },
  // {
  //   id: '17',
  //   title: 'Orthovisc',
  //   handle: 'orthovisc',
  //   description: 'Hyaluronsäure-Viskosupplementation zur Schmerzlinderung bei Kniearthrose.',
  //   price: {
  //     amount: '150.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '17',
  //       url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=800&fit=crop',
  //       altText: 'Orthovisc Knee Treatment'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '17',
  //       title: 'Default Title',
  //       price: {
  //         amount: '150.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['hyaluronic-acid', 'knee-treatment', 'pain-relief']
  // },
  // {
  //   id: '18',
  //   title: 'Ostenil',
  //   handle: 'ostenil',
  //   description: 'Hyaluronsäure-Behandlung für Gelenkschmerzen und Arthrose-Management.',
  //   price: {
  //     amount: '140.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '18',
  //       url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=800&fit=crop',
  //       altText: 'Ostenil Joint Treatment'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '18',
  //       title: 'Default Title',
  //       price: {
  //         amount: '140.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['hyaluronic-acid', 'joint-treatment', 'osteoarthritis']
  // },
  // {
  //   id: '19',
  //   title: 'Cingal',
  //   handle: 'cingal',
  //   description: 'Kombinationsbehandlung aus Hyaluronsäure und Kortikosteroid für Kniearthrose.',
  //   price: {
  //     amount: '200.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '19',
  //       url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=800&fit=crop',
  //       altText: 'Cingal Combination Treatment'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '19',
  //       title: 'Default Title',
  //       price: {
  //         amount: '200.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['hyaluronic-acid', 'corticosteroid', 'knee-treatment']
  // },
  // {
  //   id: '20',
  //   title: 'GO-ON',
  //   handle: 'go-on',
  //   description: 'Hyaluronsäure-Behandlung für Gelenkschmierung und Mobilitätsverbesserung.',
  //   price: {
  //     amount: '110.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '20',
  //       url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=800&fit=crop',
  //       altText: 'GO-ON Joint Treatment'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '20',
  //       title: 'Default Title',
  //       price: {
  //         amount: '110.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['hyaluronic-acid', 'joint-treatment', 'mobility']
  // },
  // {
  //   id: '21',
  //   title: 'Supartz',
  //   handle: 'supartz',
  //   description: 'Hyaluronsäure-Viskosupplementation für Kniearthrose-Behandlung.',
  //   price: {
  //     amount: '160.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '21',
  //       url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=800&fit=crop',
  //       altText: 'Supartz Knee Treatment'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '21',
  //       title: 'Default Title',
  //       price: {
  //         amount: '160.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['hyaluronic-acid', 'knee-treatment', 'osteoarthritis']
  // },
  // {
  //   id: '22',
  //   title: 'Euflexxa',
  //   handle: 'euflexxa',
  //   description: 'Bioengineerte Hyaluronsäure zur Schmerzlinderung bei Kniearthrose.',
  //   price: {
  //     amount: '180.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '22',
  //       url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=800&fit=crop',
  //       altText: 'Euflexxa Knee Treatment'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '22',
  //       title: 'Default Title',
  //       price: {
  //         amount: '180.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['hyaluronic-acid', 'knee-treatment', 'bioengineered']
  // },
  // // ===== OTHER INJECTABLE PRODUCTS =====
  // {
  //   id: '23',
  //   title: 'SCULPTRA',
  //   handle: 'sculptra',
  //   description: 'Poly-L-Milchsäure-Injektion für Gesichtsvolumisierung und Kollagenstimulation.',
  //   price: {
  //     amount: '350.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '23',
  //       url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=800&fit=crop',
  //       altText: 'SCULPTRA Injectable'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '23',
  //       title: 'Default Title',
  //       price: {
  //         amount: '350.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['poly-l-lactic-acid', 'collagen-stimulation', 'facial']
  // },
  // {
  //   id: '24',
  //   title: 'Ellansé',
  //   handle: 'ellanse',
  //   description: 'Polycaprolacton-basierter Filler für langanhaltende Gesichtsvolumisierung.',
  //   price: {
  //     amount: '320.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '24',
  //       url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=800&fit=crop',
  //       altText: 'Ellansé Filler'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '24',
  //       title: 'Default Title',
  //       price: {
  //         amount: '320.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['polycaprolactone', 'filler', 'long-lasting']
  // },
  // {
  //   id: '25',
  //   title: 'Perfectha-Serie',
  //   handle: 'perfectha-serie',
  //   description: 'Hyaluronsäure-Filler für Gesichtskonturierung und Faltenbehandlung.',
  //   price: {
  //     amount: '210.00',
  //     currencyCode: 'EUR'
  //   },
  //   images: [
  //     {
  //       id: '25',
  //       url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=800&fit=crop',
  //       altText: 'Perfectha-Serie Fillers'
  //     }
  //   ],
  //   variants: [
  //     {
  //       id: '25',
  //       title: 'Default Title',
  //       price: {
  //         amount: '210.00',
  //         currencyCode: 'EUR'
  //       }
  //     }
  //   ],
  //   tags: ['hyaluronic-acid', 'filler', 'facial']
  // }
];

export const mockCollections: MockCollection[] = [
  // ===== COLLECTION OPTIONS =====
];

// Create a mutable mock cart
let mockCartState: MockCart = {
  id: 'mock-cart-id',
  checkoutUrl: '#',
  cost: {
    subtotalAmount: {
      amount: '0.00',
      currencyCode: 'EUR'
    },
    totalAmount: {
      amount: '0.00',
      currencyCode: 'EUR'
    },
    totalTaxAmount: {
      amount: '0.00',
      currencyCode: 'EUR'
    }
  },
  lines: [],
  totalQuantity: 0
};

// Function to get current cart state
export function getMockCart(): MockCart {
  return { ...mockCartState };
}

// Function to add item to cart
export function addItemToMockCart(variantId: string, quantity: number = 1): MockCart {
  const product = mockProducts.find(p => p.variants.some(v => v.id === variantId));
  const variant = product?.variants.find(v => v.id === variantId);
  
  if (!product || !variant) {
    throw new Error('Product or variant not found');
  }

  const existingItem = mockCartState.lines.find(item => item.merchandise.id === variantId);
  
  if (existingItem) {
    // Update existing item
    existingItem.quantity += quantity;
    existingItem.cost.totalAmount.amount = (parseFloat(variant.price.amount) * existingItem.quantity).toFixed(2);
  } else {
    // Add new item
    const newItem: MockCartItem = {
      id: `line-${Date.now()}`,
      quantity,
      cost: {
        totalAmount: {
          amount: (parseFloat(variant.price.amount) * quantity).toFixed(2),
          currencyCode: variant.price.currencyCode
        }
      },
      merchandise: {
        id: variantId,
        title: variant.title,
        selectedOptions: [],
        product: {
          id: product.id,
          handle: product.handle,
          title: product.title,
          featuredImage: {
            url: product.images[0]?.url || '',
            altText: product.images[0]?.altText || product.title
          }
        }
      }
    };
    mockCartState.lines.push(newItem);
  }

  // Update cart totals
  const totalQuantity = mockCartState.lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = mockCartState.lines.reduce((sum, item) => sum + parseFloat(item.cost.totalAmount.amount), 0);

  mockCartState.totalQuantity = totalQuantity;
  mockCartState.cost.totalAmount.amount = totalAmount.toFixed(2);
  mockCartState.cost.subtotalAmount.amount = totalAmount.toFixed(2);

  return { ...mockCartState };
}

// Function to remove item from cart
export function removeItemFromMockCart(lineId: string): MockCart {
  mockCartState.lines = mockCartState.lines.filter(item => item.id !== lineId);
  
  // Update cart totals
  const totalQuantity = mockCartState.lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = mockCartState.lines.reduce((sum, item) => sum + parseFloat(item.cost.totalAmount.amount), 0);

  mockCartState.totalQuantity = totalQuantity;
  mockCartState.cost.totalAmount.amount = totalAmount.toFixed(2);
  mockCartState.cost.subtotalAmount.amount = totalAmount.toFixed(2);

  return { ...mockCartState };
}

// Function to update item quantity
export function updateItemQuantityInMockCart(lineId: string, quantity: number): MockCart {
  const item = mockCartState.lines.find(item => item.id === lineId);
  if (!item) {
    throw new Error('Item not found in cart');
  }

  if (quantity <= 0) {
    return removeItemFromMockCart(lineId);
  }

  const singleItemPrice = parseFloat(item.cost.totalAmount.amount) / item.quantity;
  item.quantity = quantity;
  item.cost.totalAmount.amount = (singleItemPrice * quantity).toFixed(2);

  // Update cart totals
  const totalQuantity = mockCartState.lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = mockCartState.lines.reduce((sum, item) => sum + parseFloat(item.cost.totalAmount.amount), 0);

  mockCartState.totalQuantity = totalQuantity;
  mockCartState.cost.totalAmount.amount = totalAmount.toFixed(2);
  mockCartState.cost.subtotalAmount.amount = totalAmount.toFixed(2);

  return { ...mockCartState };
}

// Function to clear the cart (for checkout)
export function clearMockCart(): MockCart {
  mockCartState = {
    id: 'mock-cart-id',
    checkoutUrl: '#',
    cost: {
      subtotalAmount: {
        amount: '0.00',
        currencyCode: 'EUR'
      },
      totalAmount: {
        amount: '0.00',
        currencyCode: 'EUR'
      },
      totalTaxAmount: {
        amount: '0.00',
        currencyCode: 'EUR'
      }
    },
    lines: [],
    totalQuantity: 0
  };
  
  return { ...mockCartState };
}

// Legacy export for backward compatibility
export const mockCart = mockCartState;
