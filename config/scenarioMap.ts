export const scenarioMap: Record<string, string> = {
  "task:add": "SCENARIO_ID_ADD_TASK",
  "task:get_today": "SCENARIO_ID_GET_TODAY_TASKS",
  "task:done": "SCENARIO_ID_MARK_TASK_DONE",
  "task:update": "SCENARIO_ID_UPDATE_TASK",
  "task:delete": "SCENARIO_ID_DELETE_TASK",

  "project:add": "SCENARIO_ID_ADD_PROJECT_WITH_TASKS",
  "project:update": "SCENARIO_ID_UPDATE_PROJECT",
  "project:get_active": "SCENARIO_ID_GET_ACTIVE_PROJECTS",
  "project:complete": "SCENARIO_ID_COMPLETE_PROJECT",
  "project:delete": "SCENARIO_ID_DELETE_PROJECT",

  "planning:get_today": "SCENARIO_ID_GET_TODAY_PLANNING",
  "planning:update": "SCENARIO_ID_UPDATE_PLANNING_ITEM",
  "planning:delete": "SCENARIO_ID_DELETE_PLANNING_ITEM",

  "feedback:add": "SCENARIO_ID_ADD_FEEDBACK",
  "feedback:get_weekly": "SCENARIO_ID_GET_WEEKLY_FEEDBACK",
  "feedback:update": "SCENARIO_ID_UPDATE_FEEDBACK",
  "feedback:delete": "SCENARIO_ID_DELETE_FEEDBACK",

  "calendar:availability": "SCENARIO_ID_CALENDAR_AVAILABILITY",
  "calendar:add": "SCENARIO_ID_ADD_TO_CALENDAR"
};
