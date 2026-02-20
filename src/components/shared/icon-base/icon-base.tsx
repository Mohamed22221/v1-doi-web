interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function Icon({ icon: IconComponent, ...props }: IconProps) {
  if (!IconComponent) return null;

  return <IconComponent {...props} />;
}
