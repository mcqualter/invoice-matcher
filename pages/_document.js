import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Find which invoices match your payment instantly. Free invoice payment matcher for contractors, freelancers & service businesses." />
        <meta name="keywords" content="invoice payment matcher, accounts receivable calculator, match invoices to payment, invoice matching tool" />
        <meta name="google-site-verification" content="vPYPp7IpAjbWPipVja9F0HQ8qpbFkcggftsropa9umA" />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4BM1WB4JYV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4BM1WB4JYV');
            `,
          }}
        />
        
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
