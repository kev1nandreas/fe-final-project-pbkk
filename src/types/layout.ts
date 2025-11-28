import type * as React from "react";

export type LayoutProps = {
	children: React.ReactNode;
	withNavbar: boolean;
	withFooter: boolean;
};

export type UploadModalProps = {
	isOpen: boolean;
	isQueryOpen?: boolean;
	onClose?: () => void;
	allowSkip?: boolean;
	skipHandler?: () => void;
	showBackdrop?: boolean;
};
