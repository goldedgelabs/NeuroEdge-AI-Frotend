/**
 * useTools hook
 * - Manages selected tool state and simple tool operations
 * - Provides a frontend-only API to open/close tool modals
 *
 * Exports:
 *  - openTool(modalName)
 *  - closeTool()
 *  - selectedTool
 *
 * Note: UIContext already provides helpers; useTools gives programmatic control.
 */

import { useState, useCallback } from "react";

export default function useTools() {
  const [selectedTool, setSelectedTool] = useState(null);

  const openTool = useCallback((name) => setSelectedTool(name), []);
  const closeTool = useCallback(() => setSelectedTool(null), []);

  return { selectedTool, openTool, closeTool };
}
