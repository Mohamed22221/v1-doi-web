export interface AuthLayoutProps {
    formContent: React.ReactNode;
    sidebarContent: React.ReactNode;
    className?: string;
    classType?: boolean
}

export interface ChildernLayoutProps {
    children: React.ReactNode;
}

export interface AuthSplitLayoutProps extends AuthLayoutProps {
    reverse?: boolean;
}
