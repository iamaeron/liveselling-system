import { LinkMinimalistic2Icon } from "@solar-icons/react/linear";
import { CheckIcon } from "@solar-icons/react/linear/check";
import { MenuItem } from "../ui/menu";
import { useState } from "react";
import { api } from "@/lib/api";

const CopyCheckoutLinkMenuItem = ({ fbId }: { fbId: string }) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = async () => {
    const res = await api.get(`/api/cart/gen-link/${fbId}`);
    const data = res.data;

    await navigator.clipboard.writeText(data.url);

    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  return (
    <MenuItem onClick={handleCopyLink} closeOnClick={false}>
      {linkCopied ? (
        <CheckIcon strokeWidth={2} size={16} className="text-emerald-600" />
      ) : (
        <LinkMinimalistic2Icon
          strokeWidth={2}
          size={16}
          className="text-zinc-600"
        />
      )}
      {linkCopied ? (
        <span className="text-emerald-600">Copied!</span>
      ) : (
        "Copy Checkout Link"
      )}
    </MenuItem>
  );
};

export default CopyCheckoutLinkMenuItem;
