import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const HomePage = () => {
  const [refLink, setRefLink] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenUrl = urlParams.get("url");

    if (!tokenUrl || !tokenUrl.startsWith("https://opensea.io/token/")) return;

    const parsedUrl = new URL(tokenUrl);
    parsedUrl.searchParams.set("os_ref", "farcaster");
    setRefLink(parsedUrl.toString());
  }, []);

  if (!refLink) {
    return (
      <div className="p-4 text-center text-red-500">
        Invalid or missing OpenSea token URL.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-xl font-bold text-center">OpenSea Token</h1>
          <iframe
            src={refLink}
            className="w-full h-[500px] border rounded-xl"
            title="OpenSea Token"
            allow="clipboard-write"
          ></iframe>
          <div className="flex justify-center">
            <Button>
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
