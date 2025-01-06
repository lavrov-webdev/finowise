import { SprintResponseDto } from "@generated";
import { groupBy } from "@system/utils/groupBy";

export const groupSprintsByStartYear = (sprints: SprintResponseDto[]) =>
  groupBy(sprints, (sprint) => new Date(sprint.startDate).getFullYear());
