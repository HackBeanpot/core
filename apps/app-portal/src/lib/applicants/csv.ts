export interface CsvColumn<T> {
  key: string;
  header: string;
  value: (row: T) => string | number | boolean | null | undefined;
}

export function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  throw new Error(
    `Not implemented: toCsv(${rows.length} rows, ${columns.length} cols)`,
  );
}
