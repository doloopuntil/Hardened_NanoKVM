// Server messages are written for logs, so start them with a capital letter.
export function capitalizeFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
