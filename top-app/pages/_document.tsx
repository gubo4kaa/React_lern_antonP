import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";

class Mydocument extends Document { // инициацлизируем документ правильно

	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		const initianPops = await Document.getInitialProps(ctx);
		return{ ...initianPops};
	}

	render(): JSX.Element {
		return (
			<Html lang="ru">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default Mydocument;