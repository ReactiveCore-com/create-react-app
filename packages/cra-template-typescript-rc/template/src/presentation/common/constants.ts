export const operators = ['>', '<', '>=', '<='];

export const USER_MESSAGES = {
  NO_DC: "There are no existing decision concepts within this decision concept template yet",
  CONFIGURE_OR_SELECT: "Configure new decision concept or select from existing decision concepts"
}

export enum ROUTES {
  ROOT = '/',
  LOGIN = '/login',
  BEGIN = '/',
  GUIDELINE_EDITOR = '/guideline/:id',
  GUIDELINE_MANAGER = '/guideline-manager',
  PATHWAY_VISUALISER = '/decision-visualiser/pathway',
  TREE_VISUALISER = '/decision-visualiser/tree'
}

export enum operatorMap {
  '>' = "greater than", 
  '<' = "less than", 
  '>=' = "greater than or equal to", 
  '<=' = "less than or equal to"
}