import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  type ColumnDef,
  type Row,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronRight, ChevronDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import type { LocationNode } from "../types";
import { LocationTypeBadge } from "./LocationTypeBadge";

export interface LocationTreeTableProps {
  nodes: LocationNode[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  filter?: string;
}

interface LocationRow extends LocationNode {
  subRows?: LocationRow[];
}

function buildTreeRows(nodes: LocationNode[], filter: string): LocationRow[] {
  const byId = new Map<string, LocationRow>();
  const roots: LocationRow[] = [];

  const normalizedFilter = filter.trim().toLowerCase();

  nodes
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .forEach((node) => {
      // Simple text filter on id/name
      if (
        normalizedFilter &&
        !node.name.toLowerCase().includes(normalizedFilter) &&
        !node.id.toLowerCase().includes(normalizedFilter)
      ) {
        return;
      }

      byId.set(node.id, { ...node, subRows: [] });
    });

  byId.forEach((node) => {
    if (!node.parentId) {
      roots.push(node);
      return;
    }
    const parent = byId.get(node.parentId);
    if (parent) {
      parent.subRows!.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

export function LocationTreeTable({
  nodes,
  selectedId,
  onSelect,
  filter = "",
}: LocationTreeTableProps) {
  const data = React.useMemo(
    () => buildTreeRows(nodes, filter),
    [nodes, filter],
  );

  const columns = React.useMemo<ColumnDef<LocationRow>[]>(
    () => [
      {
        id: "name",
        header: "Location",
        cell: ({ row }) => (
          <NameCell row={row} onSelect={onSelect} selectedId={selectedId} />
        ),
      },
      {
        id: "type",
        header: "Type",
        cell: ({ row }) => <LocationTypeBadge type={row.original.type} />,
      },
    ],
    [onSelect, selectedId],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subRows ?? [],
    state: {
      // Optionally control expanded rows here
    },
  });

  const rowModel = table.getRowModel();

  if (!rowModel.rows.length) {
    return (
      <div className="rounded-xl border bg-card/50 p-4 text-sm text-muted-foreground">
        No locations defined yet.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card/50">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rowModel.rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.original.id === selectedId ? "selected" : undefined}
              className="data-[state=selected]:bg-transparent"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="align-middle">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function NameCell({
  row,
  onSelect,
  selectedId,
}: {
  row: Row<LocationRow>;
  onSelect?: (id: string) => void;
  selectedId?: string | null;
}) {
  const isSelected = row.original.id === selectedId;
  const canExpand = row.getCanExpand();
  const isExpanded = row.getIsExpanded();

  return (
    <button
      type="button"
      onClick={() => onSelect?.(row.original.id)}
      className={
        "flex w-full items-center gap-2 py-1 text-left text-sm transition-colors " +
        (isSelected ? "font-semibold text-foreground" : "hover:bg-muted")
      }
    >
      <span style={{ paddingLeft: row.depth * 16 }} className="flex items-center gap-1">
        {canExpand && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              row.toggleExpanded();
            }}
            className="flex size-4 items-center justify-center text-muted-foreground"
          >
            {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
          </span>
        )}
        {!canExpand && <span className="w-4" />}
        <span className="truncate font-medium">{row.original.name}</span>
      </span>
    </button>
  );
}
