import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const HomePage = () => {
  const [nftData, setNftData] = useState(null);
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
      const tokenId = parts[2] || parts[1];

      const apiChain = chain === "ethereum" ? "ethereum" : "solana";
      const apiUrl = `https://api.opensea.io/api/v2/chain/${apiChain}/contract/${address}/nfts/${tokenId}`;

      fetch(apiUrl)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch from OpenSea API");
          return res.json();
        })
        .then((data) => setNftData(data.nft))
        .catch((err) => setError("Unable to load NFT data."));
    } catch (err) {
      setError("Malformed OpenSea token URL.");
    }
  }, []);

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!nftData) {
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  }

  const { name, image_url, collection } = nftData;
  const refLink = `${nftData.opensea_url}?os_ref=farcaster`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-xl font-bold text-center">{name || "Unnamed NFT"}</h1>
          {image_url && (
            <img
              src={image_url}
              alt={name || "NFT Image"}
              className="w-full rounded-xl border"
            />
          )}
          {collection?.name && (
            <p className="text-center text-gray-600">From {collection.name}</p>
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

