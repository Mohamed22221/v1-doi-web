import { LocationModalWrapper } from "@components/template/location-modal/location-modal-wrapper";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <LocationModalWrapper />
      {children}
    </>
  );
}
