import TechnologiesSection from '@/components/hire/shared/TechnologiesSection';
import { wixTechnologies } from '@/components/hire/wix/wixTechnologies';

export default function WixTechnologies() {
  return (
    <TechnologiesSection
      title="Technologies Our Wix Developers Use"
      technologies={wixTechnologies}
    />
  );
}
