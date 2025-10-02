"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Clock } from "lucide-react";
import { useState } from "react";

interface ScriptCardProps {
  script: string;
}

export function ScriptCard({ script }: ScriptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Estimate read time (average 150 words per minute)
  const wordCount = script.split(" ").length;
  const readTime = Math.max(Math.round((wordCount / 150) * 60), 15);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium">Script</CardTitle>
          <Badge variant="secondary" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />~{readTime}s
          </Badge>
        </div>
        <Button size="sm" variant="ghost" onClick={handleCopy}>
          {copied ? "Copied!" : <Copy className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {script}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Read at a natural pace with energy and emotion
        </p>
      </CardContent>
    </Card>
  );
}
