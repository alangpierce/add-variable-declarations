import type { Node } from '../types.js';

/**
 * Determines if any assignments are to properties or other non-identifiers. If
 * so, then it's illegal to put `var` to the left of the assignment.
 *
 *   a = 1;                         // false
 *   ({ b, c } = {});               // false
 *   [ d, e.f ] = [];               // true
 */
export default function lhsHasNonIdentifierAssignment(node: Node): boolean {
  switch (node.type) {
    case 'Identifier':
      return false;

    case 'ObjectPattern':
      return node.properties.some(property => lhsHasNonIdentifierAssignment(property.value));

    case 'ArrayPattern':
      return node.elements.some(lhsHasNonIdentifierAssignment);

    default:
      return true;
  }
}