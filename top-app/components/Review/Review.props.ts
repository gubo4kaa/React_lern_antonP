import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>{
	color?: 'white' | 'blue';
	children: ReactNode;
}