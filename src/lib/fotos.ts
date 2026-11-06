/** Stockfotos (Unsplash-Lizenz, kommerziell frei nutzbar). Quelle für Bildnachweis und alt-Texte. */
export const FOTOS = {
  'hero-sonnenaufgang': { alt: 'Sonnenaufgang über nebligen Bergketten in den Alpen', von: 'Tadej Skofic', quelle: 'https://unsplash.com/photos/overlooking-view-of-mountains-and-sunrise' },
  'saunasteine-dampf': { alt: 'Dampf steigt von heißen Saunasteinen in einer Holzsauna auf', von: 'HUUM', quelle: 'https://unsplash.com/@huum' },
  'aufguss-kelle': { alt: 'Aufguss mit der Kelle über den heißen Saunasteinen', von: 'HUUM', quelle: 'https://unsplash.com/@huum' },
  'sauna-entspannung': { alt: 'Mann entspannt im warmen Licht einer Holzsauna', von: 'HUUM', quelle: 'https://unsplash.com/@huum' },
  'sauna-paar': { alt: 'Zwei Menschen genießen den Aufguss in einer dampfenden Sauna', von: 'HUUM', quelle: 'https://unsplash.com/@huum' },
  'sauna-waldblick': { alt: 'Holzsauna mit Bänken, Aufgusskübel und Blick in den Wald', von: 'Clay Banks', quelle: 'https://unsplash.com/@claybanks' },
  'sauna-ofen-wald': { alt: 'Holzofen in einer Saunahütte mit großem Fenster zum Wald', von: 'Clay Banks', quelle: 'https://unsplash.com/@claybanks' },
  'sauna-modern': { alt: 'Moderne Holzsauna mit Steinofen und Panoramaglas', von: 'Auroom Wellness', quelle: 'https://unsplash.com/@auroomwellness' },
  'aufguss-steine': { alt: 'Wasser wird mit der Kelle auf die Saunasteine gegossen', von: 'HUUM', quelle: 'https://unsplash.com/@huum' },
  'huette-schnee-nacht': { alt: 'Beleuchtete Holzhütte im verschneiten Wald bei Nacht', von: 'Sean C Davis', quelle: 'https://unsplash.com/' },
  'wolkenmeer': { alt: 'Wolkenmeer zwischen Berggipfeln im Morgenlicht', von: 'Sam Ferrara', quelle: 'https://unsplash.com/@samferrara' },
  'bergkamm-abend': { alt: 'Bergkämme im warmen Abendlicht', von: 'Sven Pieren', quelle: 'https://unsplash.com/' },
  'alpen-nebel': { alt: 'Verschneite Alpengipfel im Nebel', von: 'Thomas Peham', quelle: 'https://unsplash.com/' },
  'huette-sonnenuntergang': { alt: 'Berghütte im Hochgebirge bei Sonnenuntergang', von: 'Wolfgang Lutz', quelle: 'https://unsplash.com/' },
  'almhuette-schnee': { alt: 'Almhütte im Schnee vor einem Berggipfel', von: 'Hans Ott', quelle: 'https://unsplash.com/' },
  kuebel: { alt: 'Aufgusskübel und Holzkellen auf einer Saunabank', von: 'Lukas Kubica', quelle: 'https://unsplash.com/' },
} as const;

export type FotoKey = keyof typeof FOTOS;
export const foto = (k: FotoKey) => ({ src: `/images/stock/${k}.webp`, klein: `/images/stock/${k}-sm.webp`, ...FOTOS[k] });

/** Themenbild je Ratgeber-Cluster */
export const THEMA_FOTO: Record<string, FotoKey> = {
  grundlagen: 'aufguss-kelle',
  duftlexikon: 'sauna-waldblick',
  heimsauna: 'sauna-ofen-wald',
  saunieren: 'sauna-paar',
  rituale: 'saunasteine-dampf',
};
