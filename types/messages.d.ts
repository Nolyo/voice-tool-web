// Type augmentation temporarily disabled — the new i18n schema is deep enough
// to hit next-intl's recursive type limit on some namespace lookups.
// Re-enable a leaner shape later if we want strict key autocomplete.
//
// Runtime is unaffected. We still have type-checked metadata builders via
// the `Namespace` type below.
import type messages from "../messages/en.json"

export type Messages = typeof messages
