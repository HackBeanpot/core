export type AirtableRecord = {
  id: string;
  createdTime: string;
  fields: {
    end_time: string;
    eventLocation: string;
    start_time: string;
    tags: string;
    difficulty: string;
    description: string;
    eventName: string;
  };
};

export type AirtableData = {
  records: AirtableRecord[];
};

export type Size = {
  width: number | undefined;
  height: number | undefined;
};

export type LoadableData<T> = {
  data: T;
  loading: boolean;
};
