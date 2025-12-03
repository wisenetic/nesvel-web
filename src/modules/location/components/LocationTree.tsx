import * as React from "react";
import type { LocationNode } from "../types";
import { LocationTypeBadge } from "./LocationTypeBadge";

export interface LocationTreeProps {
  nodes: LocationNode[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  filter?: string;
}

interface TreeNode extends LocationNode {
  children: TreeNode[];
}

function buildTree(nodes: LocationNode[]): TreeNode[] {
  const byId = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  nodes
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .forEach((node) => {
      byId.set(node.id, { ...node, children: [] });
    });

  byId.forEach((node) => {
    if (!node.parentId) {
      roots.push(node);
      return;
    }
    const parent = byId.get(node.parentId);
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

export function LocationTree({ nodes, selectedId, onSelect, filter }: LocationTreeProps) {
  const normalizedFilter = filter?.trim().toLowerCase() || "";
  const filtered = React.useMemo(() => {
    if (!normalizedFilter) return nodes;
    return nodes.filter((n) =>
      n.name.toLowerCase().includes(normalizedFilter) ||
      n.id.toLowerCase().includes(normalizedFilter),
    );
  }, [nodes, normalizedFilter]);

  const tree = React.useMemo(() => buildTree(filtered), [filtered]);

  if (!tree.length) {
    return (
      <div className="rounded-xl border bg-card/50 p-4 text-sm text-muted-foreground">
        No locations defined yet.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card/50 p-4">
      <ul className="space-y-1 text-sm">
        {tree.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
}

function TreeItem({
  node,
  selectedId,
  onSelect,
}: {
  node: TreeNode;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const isSelected = node.id === selectedId;

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect?.(node.id)}
        className={
          "flex w-full items-center gap-2 rounded-md px-1 py-1 text-left transition-colors " +
          (isSelected
            ? "bg-primary/10 text-primary-foreground"
            : "hover:bg-muted")
        }
      >
        <span className="text-[11px] text-muted-foreground">{node.id}</span>
        <span className="font-medium truncate">{node.name}</span>
        <LocationTypeBadge type={node.type} />
      </button>
      {node.children.length > 0 && (
        <ul className="ml-5 border-l border-border/40 pl-3">
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
