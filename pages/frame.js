export async function getServerSideProps(context) {
  const { chain, address } = context.query;

  const supportedChains = ["ethereum", "polygon", "base"];
  if (!chain || !address) {
    return {
      notFound: true,
    };
  }

  let symbol = address.slice(0, 4) + "..." + address.slice(-4);
  let name = "Unknown Token";
  let image = "https://opensea.io/static/images/logos/opensea.svg";
  let link = `https://opensea.io/token/${chain}/${address}?os_ref=farcaster`;

  if (supportedChains.includes(chain)) {
    try {
      const cg = await fetch(`https://api.coingecko.com/api/v3/coins/${chain}/contract/${address}`);
      if (cg.ok) {
        const token = await cg.json();
        symbol = token.symbol.toUpperCase();
        name = token.name;
        image = token.image.large;
      }
    } catch (e) {
      console.error("CoinGecko error", e);
    }
  }

  return {
    props: {
      symbol,
      name,
      image,
      link,
    },
  };
}

export default function Frame({ symbol, name, image, link }) {
  return (
    <html>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>{symbol} Token</title>
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content={image} />
        <meta name="fc:frame:button:1" content="View on OpenSea" />
        <meta name="fc:frame:button:1:action" content="link" />
        <meta name="fc:frame:button:1:target" content={link} />
        <meta property="og:title" content={name} />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={`View ${symbol} on OpenSea`} />
      </head>
      <body>
        <p>Token frame metadata loaded.</p>
      </body>
    </html>
  );
}

export const config = {
  api: {
    bodyParser: false,
  },
};
