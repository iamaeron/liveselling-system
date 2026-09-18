export interface ParsedClaim {
  code: string;
  quantity: number;
  rawComment: string;
}

// A token that is *purely* a quantity marker: "5", "x5", "5x", "*5", "5*"
const QTY_SHAPE = /^(?:x\d+|\d+x|\*\d+|\d+\*|\d+)$/i;

function isQuantityToken(token: string): boolean {
  return QTY_SHAPE.test(token);
}

function extractQty(token: string): number {
  const digits = token.match(/\d+/);
  return digits ? parseInt(digits[0], 10) : 1;
}

export function parseCommentClaim(commentText: string): ParsedClaim | null {
  if (!commentText) return null;
  const cleaned = commentText.trim();

  const mineMatch = cleaned.match(/\bmine\b/i);
  if (!mineMatch || mineMatch.index === undefined) return null;

  const before = cleaned.slice(0, mineMatch.index).trim();
  const after = cleaned.slice(mineMatch.index + mineMatch[0].length).trim();
  const rest = before || after; // whichever side "mine" wasn't on
  if (!rest) return null;

  const tokens = rest.split(/\s+/).filter(Boolean);

  if (tokens.length === 1) {
    return {
      code: tokens[0].toUpperCase(),
      quantity: 1,
      rawComment: commentText,
    };
  }

  const [first, second] = tokens;
  const firstIsQty = isQuantityToken(first);
  const secondIsQty = isQuantityToken(second);

  // Unambiguous: only one side looks like a quantity marker
  if (secondIsQty && !firstIsQty) {
    return {
      code: first.toUpperCase(),
      quantity: extractQty(second),
      rawComment: commentText,
    };
  }
  if (firstIsQty && !secondIsQty) {
    return {
      code: second.toUpperCase(),
      quantity: extractQty(first),
      rawComment: commentText,
    };
  }

  // Ambiguous (both or neither look quantity-shaped): default to "code then quantity"
  if (secondIsQty) {
    return {
      code: first.toUpperCase(),
      quantity: extractQty(second),
      rawComment: commentText,
    };
  }

  return { code: first.toUpperCase(), quantity: 1, rawComment: commentText };
}
