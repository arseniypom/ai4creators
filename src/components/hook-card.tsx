"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Sparkles } from "lucide-react";
import { useState } from "react";

interface HookCardProps {
  hook: string;
}

export function HookCard({ hook }: HookCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hook);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Hook
        </CardTitle>
        <Button size="sm" variant="ghost" onClick={handleCopy}>
          {copied ? "Copied!" : <Copy className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold leading-tight">{hook}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Use this as your opening line to grab attention
        </p>
      </CardContent>
    </Card>
  );
}
