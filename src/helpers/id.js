import format from 'date-fns/format'

// Create an ID based on timestamp to allow sorting
export const createExerciseId = () => new Date().toJSON();

export const createId = () => new Date().toJSON();

// Create an ID with a randomiser at the end
export const createLogId = () => `${new Date().toJSON()}${Math.random()}`;

// Takes in a log id and returns the Jsonised date value by stripping out the random number at the end
export const parseDateFromLogId = ( id ) => {
  const [createdAt] = id.split( 'Z' );
  return `${createdAt}Z`
}

export const getFormattedDate = ( jsondate ) => {
  const d = new Date( jsondate );
  return format(d, 'do MMM h:mm bbbb')
}