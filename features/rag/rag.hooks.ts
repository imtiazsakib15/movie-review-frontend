import { useMutation } from "@tanstack/react-query";

import { askCinevoo } from "./rag.api";

export function useAskCinevoo() {
  return useMutation({
    mutationFn: askCinevoo,
  });
}
