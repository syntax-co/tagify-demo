import React, { useEffect, useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAppContext } from "@/context/app-context";






const Tile = ({code}) => {

  const {activatePanel,setSelectedCode} = useAppContext()


  const statusColor = {
    active: "bg-green-500/20 text-green-600",
    paused: "bg-yellow-400/20 text-yellow-600",
  };


  const handleClick = () => {
    setSelectedCode(code)
    activatePanel('qr-code-details')
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  
  



  return(
    <TableRow key={code.id} className="hover:bg-muted
    cursor-pointer
    "
    onClick={handleClick}
    >
      <TableCell className="px-6 py-4 font-medium text-foreground">/{code.slug}</TableCell>
      <TableCell className="px-6 py-4 hidden lg:table-cell truncate max-w-xs text-foreground">
        {code.target}
      </TableCell>
      <TableCell className="px-6 py-4 text-center text-foreground">{code.stats.totalScans}</TableCell>
      <TableCell className="px-6 py-4 hidden sm:table-cell text-foreground">{formatDate(code.createdAt)}</TableCell>
      <TableCell className="px-6 py-4 text-center">
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColor[code.status]}`}>
          {code.status}
        </span>
      </TableCell>
    </TableRow>
  )
}



const QRCodesSection = () => {

  const {activatePanel,qrCodes} = useAppContext()
  

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = qrCodes.filter((code) => {
    const match =
      code.slug.toLowerCase().includes(query.toLowerCase()) ||
      code.target.toLowerCase().includes(query.toLowerCase());
    const filterMatch =
      filter === "all" || code.status.toLowerCase() === filter;
    return match && filterMatch;
  });


  




  return (
    <div className="flex-1 px-6 py-10 overflow-x-hidden">
      {/* Top bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-foreground">QR Codes</h2>
        <div 
        className="px-2 py-2 gap-2 bg-primary hover:bg-accent shadow-lg
        rounded-md flex items-center justify-center
        text-foreground cursor-pointer
        
        "
        onClick={() => {activatePanel("creating")}}
        >
          <Plus className="h-4 w-4" /> New QR
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4
      
      ">
        {/* <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search codes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-card text-foreground focus-visible:ring-ring"
          />
        </div> */}

        <div className="flex-grow"
        />

        <Select value={filter} onValueChange={setFilter}
        >
          <SelectTrigger className="w-full sm:w-44 bg-card text-foreground">
            <Filter className="h-4 w-4 mr-2 opacity-70" />
            <span className="capitalize">{filter}</span>
          </SelectTrigger>
          <SelectContent className="bg-background text-foreground">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
                <TableHead className="px-6 py-3">Slug</TableHead>
                <TableHead className="px-6 py-3 hidden lg:table-cell">Target URL</TableHead>
                <TableHead className="px-6 py-3 text-center">Scans</TableHead>
                <TableHead className="px-6 py-3 hidden sm:table-cell">Created</TableHead>
                <TableHead className="px-6 py-3 text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                filtered.map((code) => {

                  return(
                    <Tile code={code} />
                  )
                })
              }

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No QR codes found.
                  </TableCell>
                </TableRow>
              )}

            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <Pagination className="mt-6">
        {/* <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent> */}
      </Pagination>
    </div>
  );
};

export default QRCodesSection;
