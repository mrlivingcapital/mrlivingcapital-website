import type { DataLayerId, Landmark, ZoneId } from '../types'

export const ZONES: Record<ZoneId, { label: string; short: string; coordinates: string; description: string }> = {
  dubai: {
    label: 'Dubai',
    short: 'DXB',
    coordinates: '25.2048° N · 55.2708° E',
    description: 'A global gateway of dense districts, waterfront communities and internationally recognised architecture.',
  },
  'abu-dhabi': {
    label: 'Abu Dhabi',
    short: 'AUH',
    coordinates: '24.4539° N · 54.3773° E',
    description: 'Cultural institutions, civic architecture and established communities shape the capital’s urban landscape.',
  },
  'ras-al-khaimah': {
    label: 'Ras Al Khaimah',
    short: 'RAK',
    coordinates: '25.7895° N · 55.9432° E',
    description: 'A coastal market where hospitality, residential development and infrastructure require careful distinction.',
  },
}

export const LANDMARKS: Landmark[] = [
  {
    id: 'burj-khalifa', name: 'Burj Khalifa', zone: 'dubai', location: 'Downtown Dubai', category: 'Location intelligence', kind: 'burj-khalifa', status: 'existing', position: [0, 0, 0], height: 30,
    summary: 'The vertical anchor of Downtown Dubai and the opening point for exploring the district’s architectural and investment context.',
    topics: ['District dynamics', 'Investment research', 'Related field notes'],
    research: 'Downtown research is being structured around verified source material. No live pricing or yield feed is connected in this release.',
  },
  {
    id: 'burj-al-arab', name: 'Burj Al Arab', zone: 'dubai', location: 'Jumeirah', category: 'Hospitality landmark', kind: 'sail', status: 'existing', position: [-24, 0, 8], height: 15,
    summary: 'A recognisable coastal silhouette opening a discussion of hospitality, waterfront scarcity and the Jumeirah corridor.',
    topics: ['Waterfront context', 'Hospitality', 'Coastal districts'],
    research: 'Descriptive location intelligence only. Hospitality performance figures require verified sources before publication.',
  },
  {
    id: 'museum-of-the-future', name: 'Museum of the Future', zone: 'dubai', location: 'Sheikh Zayed Road', category: 'Design & technology', kind: 'museum', status: 'existing', position: [12, 0, -3], height: 10,
    summary: 'An architectural reference for the relationship between design, technology and the city’s future-facing identity.',
    topics: ['Architecture', 'PropTech concepts', 'Design notes'],
    research: 'Field notes can connect this landmark to design and technology commentary without implying an institutional affiliation.',
  },
  {
    id: 'dubai-frame', name: 'Dubai Frame', zone: 'dubai', location: 'Zabeel Park', category: 'Urban perspective', kind: 'frame', status: 'existing', position: [18, 0, 13], height: 13,
    summary: 'A literal frame between old and new Dubai, used here to explore how urban context changes across districts.',
    topics: ['Urban change', 'District context', 'Architectural discoveries'],
    research: 'Editorial location context is available; verified transaction packs are not yet attached.',
  },
  {
    id: 'emirates-towers', name: 'Emirates Towers', zone: 'dubai', location: 'Sheikh Zayed Road', category: 'Commercial district', kind: 'emirates', status: 'existing', position: [8, 0, -12], height: 19,
    summary: 'A commercial architecture anchor for examining office districts, connectivity and the Sheikh Zayed Road corridor.',
    topics: ['Office districts', 'Infrastructure', 'Commercial context'],
    research: 'Commercial research requires source-verified supply, leasing and transaction inputs before numerical analysis is shown.',
  },
  {
    id: 'dubai-marina', name: 'Dubai Marina', zone: 'dubai', location: 'Dubai Marina', category: 'Residential district', kind: 'marina', status: 'existing', position: [-15, 0, -15], height: 18,
    summary: 'A dense waterfront residential cluster representing the relationship between towers, public realm, transport and coastal living.',
    topics: ['Residential market', 'Waterfront property', 'District dynamics'],
    research: 'This release provides district context only. No live listing inventory or price claims are embedded.',
  },
  {
    id: 'ain-dubai', name: 'Ain Dubai', zone: 'dubai', location: 'Bluewaters Island', category: 'Waterfront destination', kind: 'wheel', status: 'existing', position: [-27, 0, -12], height: 13,
    summary: 'A circular waterfront landmark connecting Bluewaters Island to the wider Marina and JBR coastal context.',
    topics: ['Destination context', 'Waterfront districts', 'Connectivity'],
    research: 'Operational status and visitor figures are intentionally excluded unless separately verified.',
  },
  {
    id: 'palm-jumeirah', name: 'Palm Jumeirah', zone: 'dubai', location: 'Dubai', category: 'Luxury residential market', kind: 'palm', status: 'existing', position: [-30, 0, 24], height: 2,
    summary: 'A coastal plan-form opening perspectives on waterfront property, residential communities and the relationship between land and infrastructure.',
    topics: ['Waterfront property', 'Investment perspectives', 'Selected research'],
    research: 'Research connections are structured for future verified packs. Illustrative scenarios remain clearly labelled.',
  },
  {
    id: 'atlantis-the-palm', name: 'Atlantis The Palm', zone: 'dubai', location: 'Palm Jumeirah', category: 'Resort architecture', kind: 'atlantis', status: 'existing', position: [-38, 0, 31], height: 8,
    summary: 'The resort landmark at the Palm’s crescent, represented as part of a wider coastal system rather than an isolated object.',
    topics: ['Resort context', 'Palm Jumeirah', 'Coastal development'],
    research: 'Descriptive architectural and location context only; no commercial affiliation is implied.',
  },
  {
    id: 'sheikh-zayed-mosque', name: 'Sheikh Zayed Grand Mosque', zone: 'abu-dhabi', location: 'Abu Dhabi', category: 'Civic & cultural landmark', kind: 'mosque', status: 'existing', position: [-12, 0, 2], height: 12,
    summary: 'A civic and architectural anchor whose domes, courtyards and minarets are translated into a restrained luminous model.',
    topics: ['Civic architecture', 'Cultural context', 'Design notes'],
    research: 'Cultural and architectural context is presented without commercial or institutional claims.',
  },
  {
    id: 'louvre-abu-dhabi', name: 'Louvre Abu Dhabi', zone: 'abu-dhabi', location: 'Saadiyat Island', category: 'Cultural district', kind: 'louvre', status: 'existing', position: [13, 0, -10], height: 5,
    summary: 'A floating geometric canopy representing the cultural district and the relationship between architecture, water and public realm.',
    topics: ['Saadiyat context', 'Cultural capital', 'Architecture'],
    research: 'Future research can connect verified district material to this landmark; no unverified figures are shown.',
  },
  {
    id: 'etihad-towers', name: 'Etihad Towers', zone: 'abu-dhabi', location: 'Corniche', category: 'Mixed-use skyline', kind: 'etihad', status: 'existing', position: [2, 0, -2], height: 20,
    summary: 'A grouped skyline form used to examine mixed-use architecture and the Corniche’s urban setting.',
    topics: ['Corniche context', 'Mixed-use districts', 'Urban systems'],
    research: 'Descriptive district intelligence is available; numerical analysis awaits verified data.',
  },
  {
    id: 'qasr-al-watan', name: 'Qasr Al Watan', zone: 'abu-dhabi', location: 'Abu Dhabi', category: 'Civic architecture', kind: 'palace', status: 'existing', position: [-4, 0, 16], height: 7,
    summary: 'A formal civic composition of central dome, symmetrical wings and ceremonial landscape.',
    topics: ['Civic context', 'Architectural systems', 'Field notes'],
    research: 'Architectural commentary is editorial and does not imply any official relationship.',
  },
  {
    id: 'al-marjan-island', name: 'Al Marjan Island', zone: 'ras-al-khaimah', location: 'Ras Al Khaimah', category: 'Coastal development', kind: 'island', status: 'existing', position: [-8, 0, 4], height: 2,
    summary: 'A coral-inspired coastal plan form used to explore hospitality, residential development, infrastructure and connectivity.',
    topics: ['Coastal development', 'Hospitality & residential', 'Infrastructure'],
    research: 'Existing landform and descriptive context are separated from proposed or unfinished development representations.',
  },
  {
    id: 'wynn-al-marjan', name: 'Wynn Al Marjan Island', zone: 'ras-al-khaimah', location: 'Al Marjan Island', category: 'Hospitality development', kind: 'resort', status: 'under-construction', position: [7, 0, -4], height: 18,
    summary: 'Represented with champagne dashed outlines to distinguish an under-construction development from completed architecture.',
    topics: ['Development status', 'Hospitality context', 'Project research'],
    research: 'The model is an indicative massing reference, not a completion claim, construction schedule or investment representation.',
  },
  {
    id: 'marjan-residential', name: 'Island Residential Districts', zone: 'ras-al-khaimah', location: 'Al Marjan Island', category: 'Conceptual district layer', kind: 'marina', status: 'conceptual', position: [-2, 0, 15], height: 10,
    summary: 'A deliberately generic cluster showing how future residential research layers can be organised without presenting a specific project as real.',
    topics: ['Conceptual demonstration', 'Residential context', 'Research structure'],
    research: 'Conceptual geometry only. It is not a property listing, masterplan or investment offer.',
  },
]

export const DATA_LAYERS: { id: DataLayerId; label: string; description: string }[] = [
  { id: 'property', label: 'Property', description: 'Architectural masses and selectable landmarks.' },
  { id: 'transactions', label: 'Transactions', description: 'Illustrative markers only—not live transaction records.' },
  { id: 'infrastructure', label: 'Infrastructure', description: 'Conceptual connections between districts and transport nodes.' },
  { id: 'comparables', label: 'Comparables', description: 'Demonstration nodes showing where verified comparables could attach.' },
  { id: 'risk', label: 'Risk', description: 'Conceptual risk lenses; no automated risk score is claimed.' },
  { id: 'capital', label: 'Capital', description: 'Illustrative capital-allocation connections, not flows of real funds.' },
]

export const landmarksForZone = (zone: ZoneId) => LANDMARKS.filter((landmark) => landmark.zone === zone)
export const getLandmark = (id: string) => LANDMARKS.find((landmark) => landmark.id === id)
