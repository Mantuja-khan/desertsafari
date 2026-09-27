import { SiteHeader, AppLogo } from "./SiteHeader";

export { AppLogo as ActualLogo };

export function BlogHeader({ activeNav = "Blogs" }: { activeNav?: string }) {
  return <SiteHeader activeNav={activeNav} />;
}
