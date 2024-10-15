import { TGetSprintDto } from "@modules/Sprints/types";
import { groupBy } from "@system/utils/groupBy";

export const groupSprintsByStartYear = (sprints: TGetSprintDto[]) =>
  groupBy(sprints, (sprint) => new Date(sprint.startDate).getFullYear());
