export const sortTasks = ({ tasks }) => {
  return (
    tasks.length > 0 &&
    tasks.sort((a, b) => {
      if (a.letter < b.letter) {
        return -1;
      }
      if (a.letter > b.letter) {
        return 1;
      }
      return 0;
    })
  );
};
