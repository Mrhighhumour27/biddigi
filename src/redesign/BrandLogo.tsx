/** Original company assets. Provenance and unresolved assets: public/brands/SOURCES.md. */
const brands: Record<string, { name: string; asset: string; darkAsset?: string; surface: 'light' | 'dark' | 'platform' }> = {
  jiohotstar: { name: 'JioHotstar', asset: 'jiohotstar-original.png', darkAsset: 'jiohotstar-on-dark.png', surface: 'platform' },
  sonyliv: { name: 'Sony LIV', asset: 'sonyliv.png', surface: 'platform' },
  'prime-video': { name: 'Prime Video', asset: 'prime-video-blue.png', surface: 'platform' },
  youtube: { name: 'YouTube', asset: 'youtube.svg', surface: 'platform' },
  zee5: { name: 'ZEE5', asset: 'zee5-original.svg', darkAsset: 'zee5-navigation.png', surface: 'platform' },
  google: { name: 'Google', asset: 'google.png', surface: 'light' },
  prebid: { name: 'Prebid', asset: 'prebid.svg', surface: 'dark' },
  amazon: { name: 'Amazon Ads', asset: 'amazon.png', surface: 'dark' },
};

export function BrandLogo({ brand, label, hero = false, dark = false }: { brand: string; label?: string; hero?: boolean; dark?: boolean }) {
  const entry = brands[brand];
  if (!entry) return <span>{label ?? brand}</span>;
  return <span className={`brand-identity${hero ? ' brand-identity-hero' : ''}`}>
    <span className={`brand-logo-surface brand-logo-${entry.surface}`}>
      <img src={`/brands/${dark && entry.darkAsset ? entry.darkAsset : entry.asset}`} alt={label ? '' : entry.name} width="120" height="48" />
    </span>
    {label && <span>{label}</span>}
  </span>;
}

export function NetworkBrand({ name }: { name: string }) {
  const key = name.startsWith('Google') ? 'google' : name.startsWith('Prebid') ? 'prebid' : name.startsWith('Amazon') ? 'amazon' : '';
  return key ? <BrandLogo brand={key} label={name} /> : <span>{name}</span>;
}
