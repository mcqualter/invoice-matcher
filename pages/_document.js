import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Find which invoices match your payment instantly. Free invoice payment matcher for contractors, freelancers & service businesses." />
        <meta name="keywords" content="invoice payment matcher, accounts receivable calculator, match invoices to payment, invoice matching tool" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
