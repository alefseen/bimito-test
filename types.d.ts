declare module '*.styl' {
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}

declare module '*.svg' {
	const file: string;
	export = file;
}
