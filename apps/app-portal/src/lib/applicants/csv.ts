export interface CsvColumn<T> {
  header: string;
  value: (row: T) => string;
}

/** RFC 4180-style escaping: quote-wrap if the value has a comma/quote/newline; double internal quotes. */
function escapeCsvField(raw: string): string {
  if (/[",\r\n]/.test(raw)) {
    return `"${raw.replace(/"/g, '""')}"`;
  }
  return raw;
}

/**
 * Normalizes a response-map value (a multi-select question can be an array,
 * others are a scalar or absent) into a single display string, so column
 * `value` functions never need their own array-join/nullish-check/cast.
 */
export function responseField(
  responses:
    | Record<string, string | string[] | number | boolean | null>
    | undefined,
  key: string,
): string {
  const v = responses?.[key];
  if (Array.isArray(v)) return v.join("; ");
  return v === null || v === undefined ? "" : String(v);
}

/**
 * Streams a CSV response body row-by-row from an async iterable (e.g. a
 * Mongo cursor) with bounded memory — never materializes all rows at once.
 */
export function toCsv<T>(
  rows: AsyncIterable<T>,
  columns: CsvColumn<T>[],
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const iterator = rows[Symbol.asyncIterator]();
  let wroteHeader = false;

  return new ReadableStream<Uint8Array>({
    // `pull` (not `start`) + a manual iterator so `cancel()` can call
    // `iterator.return()` and close the underlying Mongo cursor if the
    // client aborts the download mid-stream, instead of leaking it.
    async pull(controller) {
      if (!wroteHeader) {
        controller.enqueue(
          encoder.encode(
            columns.map((c) => escapeCsvField(c.header)).join(",") + "\r\n",
          ),
        );
        wroteHeader = true;
      }
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
        return;
      }
      controller.enqueue(
        encoder.encode(
          columns.map((c) => escapeCsvField(c.value(value))).join(",") + "\r\n",
        ),
      );
    },
    async cancel() {
      await iterator.return?.();
    },
  });
}
