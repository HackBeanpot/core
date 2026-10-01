import { createDateSingletonHandlers } from "@/lib/admin/date-route-handlers";
import { SingletonKey } from "@/lib/types/singleton";

export const { GET, POST } = createDateSingletonHandlers(
  SingletonKey.RegistrationOpen,
);
