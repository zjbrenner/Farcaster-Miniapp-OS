import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const HomePage = () => {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenUrl = urlParams.get("url");

    if (!tokenUrl || !tokenUrl.startsWith("https://opensea.io/token/")) {
      setError("Invalid or missing OpenSea token URL.");
      return;
    }

    try {
      const parts = tokenUrl.replace("https://opensea.io/token/", "").split("/");
      const chain = parts[0];
      const address = parts[1];

      const refLink = `${tokenUrl}?os_ref=farcaster`;

      const fetchTokenInfo = async () => {
        if (chain === "solana") {
         const heliusUrl = `https://api.helius.xyz/v0/token-metadata?mint=${address}&api-key=bab93813-b857-44e2-8d56-11ef06bd090b`;
          const response = await fetch(`https://api.helius.xyz/v0/token-metadata?mint=${address}&api-key=bab93813-b857-44e2-8d56-11ef06bd090b`);
          if (!response.ok) throw new Error("Helius API error");
          const data = await response.json();
          const token = data?.[0]?.token_info;
          if (!token) throw new Error("No token info found");
          setTokenInfo({
            name: token.name,
            symbol: token.symbol,
            image: token.image_url,
            refLink
          });
        } else {
          const supportedChains = ["ethereum", "polygon", "base"];
          const cgPlatform = supportedChains.includes(chain) ? chain : null;
          if (!cgPlatform) throw new Error("Unsupported chain for token preview");

          const cgUrl = `https://api.coingecko.com/api/v3/coins/${cgPlatform}/contract/${address}`;
          const response = await fetch(cgUrl);
          if (!response.ok) throw new Error("Token not found on CoinGecko");
          const data = await response.json();
          const { name, symbol, image } = data;
          setTokenInfo({
            name,
            symbol: symbol.toUpperCase(),
            image: image.large,
            refLink
          });
        }
      };

      fetchTokenInfo().catch((err) => {
        console.error(err);
        setError("Unable to load token data. This token may not be supported.");
      });
    } catch (err) {
      console.error(err);
      setError("Malformed OpenSea token URL.");
    }
  }, []);

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!tokenInfo) {
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  }

  const { name, symbol, image, refLink } = tokenInfo;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-xl font-bold text-center">{symbol || "Token"}</h1>
          {name && <p className="text-center text-gray-600">{name}</p>}
          {image && (
            <img
              src={image}
              alt={symbol || "Token Logo"}
              className="w-24 h-24 mx-auto rounded-full border"
            />
          )}
          <div className="flex justify-center">
            <Button asChild>
              <a href={refLink} target="_blank" rel="noopener noreferrer">
                View on OpenSea ↗
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
